import { useEffect, useRef, useState } from 'react'
import { heroImage } from '../data/menuItems.js'
import useHeroParallax, { usePrefersReducedMotion } from '../hooks/useHeroParallax.js'
import { ArrowLeft, PlayIcon } from './Icons.jsx'

export default function Hero({ onNavigate, onOpen }) {
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  // Restrained mouse + scroll parallax, desktop only (see the hook for the gates)
  const mediaRef = useHeroParallax()

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
    <section className="hero" id="hero">
      <div className="hero__left">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">قهوه تخصصی، حال‌وهوایی گرم‌تر</p>
          <h1 className="hero__title">
            <span>بیشتر از</span>
            <span>یک فنجان</span>
            <span>قهوه</span>
          </h1>
          <p className="hero__sub">
            دانه‌های قهوه باکیفیت، طعم‌های فصلی و فضایی دنج برای لحظه‌ای آرامش.
          </p>
          <div className="hero__cta">
            <button className="btn btn--dark" onClick={() => onNavigate('menu')}>
              مشاهده منو
              <ArrowLeft className="arrow" width="16" height="16" />
            </button>
            <button className="btn btn--outline" onClick={() => onOpen('story')}>
              <PlayIcon width="16" height="16" />
              داستان ما را ببینید
            </button>
          </div>
        </div>
      </div>
      {/* The parallax offsets live on this wrapper so every layer inside
          (media, center caption, corner caption) inherits them */}
      <div className="hero__right" ref={mediaRef}>
        {/* Media layer — the still photo is the poster and stays as a fallback
            underneath, so the video fades in over it without any layout shift. */}
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
          {/* Readability scrim — only over the video, and only as much as the
              cream captions need */}
          <span
            className={`hero__scrim${videoReady ? ' is-ready' : ''}`}
            aria-hidden="true"
          />
        </div>
        <span className="hero__overlay-text">قهوه خوب، فردایی روشن‌تر</span>
        <span className="hero__script">قهوه خوب<br />فردایی روشن‌تر</span>
      </div>
    </section>
  )
}
