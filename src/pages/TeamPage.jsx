import PageHero from '../components/PageHero.jsx'
import Team from '../sections/Team.jsx'
import CTASection from '../sections/CTASection.jsx'
import { sectionImages } from '../data/site.js'

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="تیم"
        title="افرادی که در کنار شما هستند"
        description="تیمی کوچک، متخصص و پاسخ‌گو؛ هر مشاور مسئول شمار محدودی از پرونده‌ها است تا وقت کافی برای شما داشته باشد."
        image={sectionImages.teamHero}
        crumbs={[{ label: 'تیم' }]}
      />

      <Team />
      <CTASection />
    </>
  )
}
