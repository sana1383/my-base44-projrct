/* Image helpers.
   Photography is served from the Unsplash CDN; every URL is built here so
   width/quality params and srcsets stay consistent across the site. */

const CDN = 'https://images.unsplash.com/'

export const photo = (id) => `${CDN}${id}`

export const imgUrl = (base, width = 1200) =>
  `${base}?auto=format&fit=crop&w=${width}&q=80`

export const imgSrcSet = (base, widths = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${imgUrl(base, w)} ${w}w`).join(', ')
