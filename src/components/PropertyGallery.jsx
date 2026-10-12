import { useCallback, useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { imgUrl, imgSrcSet } from '../lib/images.js'
import { faNumber } from '../lib/format.js'

/**
 * Property gallery: large lead image, thumbnail rail, and a fullscreen viewer.
 * Arrow keys and Escape work in the viewer; body scroll is locked while open.
 */
export default function PropertyGallery({ images, title }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const go = useCallback(
    (dir) => setIndex((current) => (current + dir + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    if (!open) return undefined
    document.documentElement.classList.add('no-scroll')
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowLeft') go(1)
      if (event.key === 'ArrowRight') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go])

  return (
    <>
      <div className="gallery">
        <div className="gallery__main">
          <img
            src={imgUrl(images[index], 1200)}
            srcSet={imgSrcSet(images[index], [640, 960, 1200, 1600])}
            sizes="(max-width: 1024px) 100vw, 62vw"
            alt={`${title} — تصویر ${faNumber(index + 1)} از ${faNumber(images.length)}`}
            width="1200"
            height="750"
            loading="eager"
            decoding="async"
          />

          <button
            type="button"
            className="gallery__expand"
            onClick={() => setOpen(true)}
            aria-label="مشاهدهٔ تمام‌صفحهٔ تصاویر"
          >
            <Icon name="expand" size={15} />
            نمایش تمام‌صفحه
          </button>

          <button
            type="button"
            className="icon-btn gallery__nav gallery__nav--prev"
            onClick={() => go(-1)}
            aria-label="تصویر قبلی"
          >
            <Icon name="chevronRight" size={17} />
          </button>
          <button
            type="button"
            className="icon-btn gallery__nav gallery__nav--next"
            onClick={() => go(1)}
            aria-label="تصویر بعدی"
          >
            <Icon name="chevronLeft" size={17} />
          </button>
        </div>

        <div className="gallery__thumbs" role="tablist" aria-label="تصاویر ملک">
          {images.map((image, i) => (
            <button
              key={image + i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`تصویر ${faNumber(i + 1)}`}
              className={`gallery__thumb ${i === index ? 'is-active' : ''}`.trim()}
              onClick={() => setIndex(i)}
            >
              <img src={imgUrl(image, 320)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>

      <div
        className={`lightbox ${open ? 'is-open' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={`تصاویر ${title}`}
        hidden={!open}
      >
        <div className="lightbox__bar">
          <span>
            {title} — {faNumber(index + 1)} / {faNumber(images.length)}
          </span>
          <button
            type="button"
            className="icon-btn lightbox__close"
            onClick={() => setOpen(false)}
            aria-label="بستن نمایشگر تصاویر"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="lightbox__stage">
          <img
            src={imgUrl(images[index], 1600)}
            alt={`${title} — تصویر ${faNumber(index + 1)}`}
            decoding="async"
          />
          <button
            type="button"
            className="icon-btn lightbox__nav lightbox__nav--prev"
            onClick={() => go(-1)}
            aria-label="تصویر قبلی"
          >
            <Icon name="chevronRight" size={18} />
          </button>
          <button
            type="button"
            className="icon-btn lightbox__nav lightbox__nav--next"
            onClick={() => go(1)}
            aria-label="تصویر بعدی"
          >
            <Icon name="chevronLeft" size={18} />
          </button>
        </div>

        <div className="lightbox__strip">
          {images.map((image, i) => (
            <button
              key={image + i}
              type="button"
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`تصویر ${faNumber(i + 1)}`}
            >
              <img src={imgUrl(image, 220)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
