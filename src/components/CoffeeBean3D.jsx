import { useEffect, useRef, useState } from 'react'

/**
 * The site's one true 3D element: a slowly turning roasted coffee bean.
 *
 * three.js is imported *dynamically*, and only once this band comes near the
 * viewport — so it is a separate chunk, off the wire entirely for a visitor who
 * never scrolls this far, and never in the way of the hero video or first paint.
 *
 * The bean is a real mesh: one sphere reshaped in place (see `beanGeometry`) and
 * lit by a warm key, a copper rim and a soft bounce. Nothing is faked with a CSS
 * shape or an image.
 *
 * The wrapper reports its state in `data-state` so every fallback is observable:
 *   idle     — waiting for the band to approach the viewport (nothing loaded yet)
 *   loading  — three.js on the wire
 *   live     — running, turning and answering the pointer
 *   static   — loaded but parked (prefers-reduced-motion): one still frame
 *   fallback — no WebGL, or the module failed: the band renders without it
 * `data-drag` is added on the wrapper while a touch is turning the bean.
 */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const DESKTOP = '(min-width: 861px)'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * A coffee bean, built from a sphere: narrowed along its length and depth, then
 * dented by the longitudinal crease a roasted bean is recognised by.
 *
 * The crease is not a straight seam — it wanders across the face as it runs from
 * one tip to the other (`bend`), and fades out at both ends (`1 - x * x`), which
 * is how the groove on a real bean behaves. So no model file has to be fetched.
 */
function beanGeometry(THREE) {
  const geo = new THREE.SphereGeometry(1, 128, 96)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    // the crease drifts across the face as it travels the length of the bean
    const bend = 0.26 * Math.sin(x * Math.PI * 0.85)
    // angle around the bean's long axis (x), wrapped to 0…π from the crease side
    let d = Math.abs(Math.atan2(z, y) - (Math.PI / 2 + bend))
    if (d > Math.PI) d = Math.PI * 2 - d
    const furrow = Math.exp(-(d * d) / 0.045) * (1 - x * x)
    const pinch = 1 - 0.42 * furrow
    // 1 : 0.72 : 0.5 — length : width : thickness, the proportions of a real bean
    pos.setXYZ(i, x, y * 0.72 * pinch, z * 0.5 * pinch)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

export default function CoffeeBean3D() {
  const wrapRef = useRef(null)
  const [state, setState] = useState('idle')

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    if (!hasWebGL()) {
      setState('fallback')
      return
    }

    let cancelled = false
    let teardown = () => {}

    const reduced = window.matchMedia(REDUCED_MOTION)
    const desktop = window.matchMedia(DESKTOP)

    const load = () => {
      if (cancelled) return
      setState('loading')

      import('three')
        .then((THREE) => {
          if (cancelled) return

          let renderer
          try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
          } catch {
            setState('fallback')
            return
          }

          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
          renderer.setClearAlpha(0)
          renderer.toneMapping = THREE.ACESFilmicToneMapping
          renderer.toneMappingExposure = 1.08
          renderer.domElement.setAttribute('aria-hidden', 'true')
          wrap.appendChild(renderer.domElement)

          const scene = new THREE.Scene()
          const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
          camera.position.set(0, 0.1, 4)

          const geo = beanGeometry(THREE)
          const mat = new THREE.MeshPhysicalMaterial({
            color: 0x2b170e,
            roughness: 0.5,
            metalness: 0.05,
            clearcoat: 0.32,
            clearcoatRoughness: 0.55,
          })
          const bean = new THREE.Mesh(geo, mat)
          scene.add(bean)

          // warm key from above, copper rim from behind, faint bounce underneath
          const key = new THREE.DirectionalLight(0xffe7cd, 3.1)
          key.position.set(2.8, 3.4, 3.6)
          const rim = new THREE.DirectionalLight(0xd8a87e, 1.9)
          rim.position.set(-3.4, 1.4, -2.4)
          const bounce = new THREE.DirectionalLight(0xfff2e2, 0.5)
          bounce.position.set(0.4, -2.6, 1.6)
          scene.add(key, rim, bounce, new THREE.HemisphereLight(0xffe9d2, 0x150c07, 0.85))

          const render = () => renderer.render(scene, camera)

          let frame = 0

          // The canvas inherits the CSS box, so nothing moves while three.js loads
          const resize = () => {
            const w = wrap.clientWidth
            const h = wrap.clientHeight
            if (!w || !h) return
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h, false)
            if (!frame) render() // a resize clears the buffer: keep the still frame drawn
          }

          // ---- pointer: a real mouse on a desktop-sized screen leans the bean,
          //      a finger turns it (lightweight, and it eases back into the spin)
          const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
          const drag = { current: 0, target: 0, startX: 0, active: false }
          const isTouch = (e) => e.pointerType === 'touch' || e.pointerType === 'pen'

          const onPointerDown = (e) => {
            if (!isTouch(e) || reduced.matches) return
            drag.active = true
            drag.startX = e.clientX
            wrap.setAttribute('data-drag', 'active')
          }

          const endDrag = (e) => {
            if (e && e.pointerType && !isTouch(e)) return
            drag.active = false
            drag.target = 0 // release: the drag eases out and the steady turn resumes
            wrap.removeAttribute('data-drag')
          }

          const onPointerMove = (e) => {
            if (isTouch(e)) {
              if (!drag.active) return
              // at most about half a turn, so a long swipe never whips it around
              drag.target = Math.max(-0.9, Math.min(0.9, (e.clientX - drag.startX) * 0.008))
              return
            }
            if (!desktop.matches || (e.pointerType && e.pointerType !== 'mouse')) return
            const r = wrap.getBoundingClientRect()
            if (!r.width || !r.height) return
            pointer.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
            pointer.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
          }
          const onPointerLeave = () => { pointer.tx = 0; pointer.ty = 0 }

          wrap.addEventListener('pointerdown', onPointerDown)
          wrap.addEventListener('pointermove', onPointerMove, { passive: true })
          wrap.addEventListener('pointerleave', onPointerLeave)
          // the finger can leave the stage before it lifts, so the release is global
          window.addEventListener('pointerup', endDrag)
          window.addEventListener('pointercancel', endDrag)

          // ---- the loop, parked whenever the band is off-screen or motion is unwelcome
          let spin = 0
          let last = performance.now()

          const tick = (now) => {
            frame = requestAnimationFrame(tick)
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            spin += dt * 0.34
            pointer.x += (pointer.tx - pointer.x) * 0.06
            pointer.y += (pointer.ty - pointer.y) * 0.06
            // under the finger the turn follows closely; let go and it eases home
            drag.current += (drag.target - drag.current) * (drag.active ? 0.2 : 0.05)
            // slow turn, a whisper of wobble, and a restrained lean toward the pointer
            bean.rotation.y = spin + pointer.x * 0.32 + drag.current
            bean.rotation.x = -0.16 + pointer.y * -0.22
            bean.rotation.z = Math.sin(spin * 0.6) * 0.045
            render()
          }

          const start = () => {
            if (frame || reduced.matches) return
            last = performance.now()
            frame = requestAnimationFrame(tick)
          }
          const stop = () => {
            if (frame) cancelAnimationFrame(frame)
            frame = 0
          }

          const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) start()
            else stop()
          }, { rootMargin: '120px' })
          io.observe(wrap)

          const ro = new ResizeObserver(resize)
          ro.observe(wrap)

          const syncMotion = () => {
            if (reduced.matches) {
              stop()
              render() // one still frame: the bean is shown, it just does not move
              setState('static')
            } else {
              setState('live')
              start()
            }
          }
          reduced.addEventListener('change', syncMotion)

          resize()
          syncMotion()

          teardown = () => {
            stop()
            reduced.removeEventListener('change', syncMotion)
            io.disconnect()
            ro.disconnect()
            wrap.removeEventListener('pointerdown', onPointerDown)
            wrap.removeEventListener('pointermove', onPointerMove)
            wrap.removeEventListener('pointerleave', onPointerLeave)
            window.removeEventListener('pointerup', endDrag)
            window.removeEventListener('pointercancel', endDrag)
            wrap.removeAttribute('data-drag')
            geo.dispose()
            mat.dispose()
            renderer.dispose()
            renderer.forceContextLoss?.()
            renderer.domElement.remove()
          }
        })
        .catch(() => {
          if (!cancelled) setState('fallback')
        })
    }

    // Nothing is fetched until the band is nearly on screen
    const gate = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      gate.disconnect()
      load()
    }, { rootMargin: '200px' })
    gate.observe(wrap)

    return () => {
      cancelled = true
      gate.disconnect()
      teardown()
    }
  }, [])

  return <div className="bean3d" ref={wrapRef} data-state={state} aria-hidden="true" />
}
