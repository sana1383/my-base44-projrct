import { photo } from '../lib/images.js'

export const brand = {
  name: 'املاک افق',
  latinName: 'HORIZON',
  tagline: 'املاک ممتاز',
  phone: '۰۲۱ ۸۸۴۵ ۲۲۹۰',
  phoneHref: '+982188452290',
  email: 'info@horizon.example',
  address: 'تهران، خیابان ولیعصر، برج افق، طبقهٔ ۱۲',
  hours: 'شنبه تا پنجشنبه، ۹ تا ۱۹',
}

export const navItems = [
  { label: 'خانه', to: '/' },
  { label: 'املاک', to: '/properties' },
  { label: 'درباره ما', to: '/about' },
  { label: 'خدمات', to: '/services' },
  { label: 'تیم', to: '/team' },
  { label: 'تماس', to: '/contact' },
]

export const heroStats = [
  { value: '۱٬۲۰۰+', label: 'معاملهٔ موفق' },
  { value: '۴.۹', label: 'رضایت مشتریان' },
  { value: '۱۸ سال', label: 'تجربهٔ تخصصی' },
]

export const aboutPoints = [
  'مشاورهٔ اختصاصی و شفاف در هر مرحله از معامله',
  'دسترسی به املاک خارج از فهرست عمومی',
  'ارزیابی دقیق ارزش ملک بر پایهٔ داده‌های بازار',
]

export const services = [
  {
    id: 'luxury-sales',
    title: 'فروش خانه‌های لوکس',
    text: 'معرفی هدفمند و محرمانهٔ املاک ممتاز به خریداران واجد شرایط، با روایت حرفه‌ای از ارزش ملک.',
  },
  {
    id: 'investment',
    title: 'سرمایه‌گذاری در املاک',
    text: 'تحلیل بازدهی، برآورد ریسک و انتخاب دارایی‌های پایدار برای پرتفوی سرمایه‌گذاری شما.',
  },
  {
    id: 'marketing',
    title: 'بازاریابی املاک',
    text: 'عکاسی معماری، تور مجازی و کمپین‌های اختصاصی برای دیده‌شدن ملک در جایگاه درست.',
  },
  {
    id: 'advisory',
    title: 'مشاورهٔ املاک',
    text: 'همراهی در تصمیم‌های کلان؛ از انتخاب محله تا ساختار حقوقی و مالی معامله.',
  },
  {
    id: 'valuation',
    title: 'ارزیابی املاک',
    text: 'گزارش ارزش‌گذاری مستند بر پایهٔ داده‌های بازار، وضعیت ملک و چشم‌انداز منطقه.',
  },
  {
    id: 'relocation',
    title: 'خدمات جابه‌جایی',
    text: 'برنامه‌ریزی کامل نقل‌مکان؛ از یافتن خانه تا هماهنگی‌های اداری و خدمات پس از سکونت.',
  },
]

export const whyFeatures = [
  {
    id: 'curated',
    icon: 'star',
    title: 'انتخاب‌شده و محدود',
    text: 'هر ملک پیش از ورود به فهرست افق، از نظر کیفیت ساخت، موقعیت و ارزش بررسی می‌شود.',
  },
  {
    id: 'transparent',
    icon: 'shield',
    title: 'شفافیت کامل',
    text: 'قیمت واقعی، سابقهٔ ملک و هزینه‌های معامله — بدون ابهام و بدون هزینهٔ پنهان.',
  },
  {
    id: 'expertise',
    icon: 'compass',
    title: 'تخصص محلی',
    text: 'تیم ما هر محله را می‌شناسد؛ از روند قیمت تا کیفیت زندگی در کوچه‌به‌کوچه.',
  },
  {
    id: 'support',
    icon: 'key',
    title: 'همراهی تا تحویل کلید',
    text: 'از اولین بازدید تا امضای سند و تحویل کلید، یک مشاور ثابت همراه شماست.',
  },
]

export const whyStats = [
  { value: '۱٬۲۰۰+', label: 'خانواده که خانهٔ خود را با افق یافتند' },
  { value: '۹۸٪', label: 'معاملات انجام‌شده در زمان توافق‌شده' },
  { value: '۳۱', label: 'محلهٔ تخصصی زیر پوشش' },
]

export const team = [
  {
    id: 'daniel-morgan',
    name: 'دانیل مورگان',
    role: 'مدیرعامل',
    photo: photo('photo-1560250097-0b93528c311a'),
  },
  {
    id: 'olivia-carter',
    name: 'اولیویا کارتر',
    role: 'مشاور املاک لوکس',
    photo: photo('photo-1573496359142-b8d87734a5a2'),
  },
  {
    id: 'james-wilson',
    name: 'جیمز ویلسون',
    role: 'مشاور سرمایه‌گذاری',
    photo: photo('photo-1507003211169-0a1dd7228f2d'),
  },
  {
    id: 'sophia-bennett',
    name: 'سوفیا بنت',
    role: 'کارشناس ارشد املاک',
    photo: photo('photo-1494790108377-be9c29b29330'),
  },
]

export const socials = [
  { id: 'instagram', label: 'اینستاگرام', href: 'https://instagram.com' },
  { id: 'linkedin', label: 'لینکدین', href: 'https://linkedin.com' },
  { id: 'telegram', label: 'تلگرام', href: 'https://telegram.org' },
  { id: 'whatsapp', label: 'واتس‌اپ', href: 'https://whatsapp.com' },
]

export const footerLegal = [
  { label: 'قوانین و مقررات', to: '/contact' },
  { label: 'حریم خصوصی', to: '/contact' },
  { label: 'تماس با ما', to: '/contact' },
]

/* Editorial imagery used by the home page sections */
export const sectionImages = {
  hero: photo('photo-1613490493576-7fde63acd811'),
  aboutMain: photo('photo-1600585154340-be6161a56a0c'),
  aboutSide: photo('photo-1600566753086-00f18fb6b3ea'),
  services: photo('photo-1600596542815-ffad4c1539a9'),
  propertiesHero: photo('photo-1512917774080-9991f1c4c750'),
  aboutHero: photo('photo-1600607687939-ce8a6c25118c'),
  contactHero: photo('photo-1600047509807-ba8f99d2cdde'),
  teamHero: photo('photo-1449844908441-8829872d2607'),
  servicesHero: photo('photo-1583608205776-bfd35f0d9f83'),
}
