// Minimal line-art icons — thin stroke, consistent 24x24 viewBox
const I = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" {...props} />
)

export const SearchIcon = (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></I>
export const CartIcon = (p) => <I {...p}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" /></I>
export const MenuIcon = (p) => <I {...p}><path d="M3 12h18M3 6h18M3 18h18" /></I>
// ArrowRight / ArrowUpRight are kept for any LTR-facing use
export const ArrowRight = (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>
export const ArrowUpRight = (p) => <I {...p}><path d="M7 17L17 7M7 7h10v10" /></I>
// RTL-facing directional arrows (forward = left in a right-to-left layout)
export const ArrowLeft = (p) => <I {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></I>
export const ArrowUpLeft = (p) => <I {...p}><path d="M17 17L7 7M17 7H7v10" /></I>
export const PlusIcon = (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>
export const PlayIcon = (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4V8z" /></I>
export const LeafIcon = (p) => <I {...p}><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.5-6" /></I>
export const FlowerIcon = (p) => <I {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2a3 3 0 010 6M12 16a3 3 0 010 6M2 12a3 3 0 016 0M16 12a3 3 0 016 0" /></I>
export const HomeIcon = (p) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></I>
export const CupIcon = (p) => <I {...p}><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><path d="M6 2v3M10 2v3M14 2v3" /></I>
export const PinIcon = (p) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></I>
export const ClockIcon = (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></I>
export const PhoneIcon = (p) => <I {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></I>
export const InstagramIcon = (p) => <I {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></I>
export const TikTokIcon = (p) => <I {...p}><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" /></I>
export const PinterestIcon = (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 7v10M9.5 9.5c0 2 1 3 2.5 3s2.5-1.5 2.5-3.5S13 7 11.5 7 9.5 8 9.5 9.5z" /></I>
export const SpotifyIcon = (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M7 10c3-1 7-1 10 1M7.5 13.5c2.5-.8 6-.5 8.5 1M8 16.5c2-.5 4-.3 5.5.7" /></I>
export const MinusIcon = (p) => <I {...p}><path d="M5 12h14" /></I>
export const TrashIcon = (p) => <I {...p}><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></I>
