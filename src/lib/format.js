/* Persian-aware formatting helpers.
   All numbers rendered to the user go through here so the whole UI
   stays consistent with Persian digits. */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export const toFa = (value) => String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])

export const faNumber = (value, options) =>
  toFa(new Intl.NumberFormat('en-US', options || {}).format(value))

/** 2350000 -> «۲.۳۵ میلیون دلار» */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '—'
  if (price >= 1_000_000) {
    const millions = Math.round((price / 1_000_000) * 100) / 100
    return `${toFa(millions)} میلیون دلار`
  }
  if (price >= 1_000) return `${faNumber(Math.round(price / 1000))} هزار دلار`
  return `${faNumber(price)} دلار`
}

/** 2350000 -> «۲.۳۵ م» (compact, for chips and cards) */
export const formatPriceShort = (price) => {
  if (!price && price !== 0) return '—'
  if (price >= 1_000_000) {
    const millions = Math.round((price / 1_000_000) * 100) / 100
    return `${toFa(millions)} میلیون`
  }
  return `${faNumber(Math.round(price / 1000))} هزار`
}

export const formatArea = (area) => `${faNumber(area)} متر مربع`

export const formatCount = (value, unit) => `${faNumber(value)} ${unit}`
