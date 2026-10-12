import { Link } from 'react-router-dom'
import { imgUrl, imgSrcSet } from '../lib/images.js'

/** Inner-page masthead. Pass `image` for the editorial photo variant. */
export default function PageHero({ eyebrow, title, description, image, crumbs = [] }) {
  return (
    <header className={`page-hero ${image ? 'page-hero--image' : ''}`.trim()}>
      {image ? (
        <div className="page-hero__media" aria-hidden="true">
          <img
            src={imgUrl(image, 1600)}
            srcSet={imgSrcSet(image, [800, 1200, 1600])}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="container page-hero__inner">
        {crumbs.length ? (
          <nav className="crumbs" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} style={{ display: 'contents' }}>
                <span className="crumbs__sep" aria-hidden="true">
                  /
                </span>
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        ) : null}

        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  )
}
