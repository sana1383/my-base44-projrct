import { useEffect, useRef, useState } from 'react'
import { heroImage } from '../data/menuItems.js'
import useHeroParallax, { usePrefersReducedMotion } from '../hooks/useHeroParallax.js'
import { ArrowLeft, PlayIcon } from './Icons.jsx'

export default function Hero({ onNavigate, onOpen }) {
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  // The section holds the offset variables, so the media, the copy and the
  // corner line each inherit them and move at their own rate (see the hook).
  const heroRef = useHeroParallax()

  // Reduced motion keeps the still photo and pauses the background video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reducedMotion) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [reducedMotion])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Full-bleed media layer — the still photo is the poster and stays as a
          fallback underneath, so the video fades in over it with no shift */}
      <div className="hero__media">
        <img
          className="hero__img"
          src={heroImage}
          alt="فضای دنج و آفتاب‌گرفته کافه HARTH COFFEE با بار چوبی و دستگاه اسپرسو"
          loading="eager"
          fetchpriority="high"
        />
        <video
          ref={videoRef}
          className={`hero__video${videoReady ? ' is-ready' : ''}`}
          src="/media/harth-hero.mp4"
          poster={heroImage}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => !reducedMotion && setVideoReady(true)}
        />
      </div>
      {/* Readability scrim — only as much shade as the copy needs */}
      <span className={`hero__scrim${videoReady ? ' is-ready' : ''}`} aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">قهوه تخصصی، حال‌وهوایی گرم‌تر</p>
          <h1 className="hero__title">
            <span>بیشتر از یک فنجان</span>
            <span>قهوه</span>
          </h1>
          <p className="hero__sub">
            دانه‌های قهوه باکیفیت، طعم‌های فصلی و فضایی دنج برای لحظه‌ای آرامش.
          </p>
          <div className="hero__cta">
            <button className="btn btn--light" onClick={() => onNavigate('menu')}>
              مشاهده منو
              <ArrowLeft className="arrow" width="16" height="16" />
            </button>
            <button className="btn btn--outline-light" onClick={() => onOpen('story')}>
              <PlayIcon width="16" height="16" />
              داستان ما را ببینید
            </button>
          </div>
        </div>
        <span className="hero__script">قهوه خوب<br />فردایی روشن‌تر</span>
      </div>
    </section>
  )
}
