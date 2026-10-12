import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import FeaturedProperties from '../sections/FeaturedProperties.jsx'
import Services from '../sections/Services.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import Team from '../sections/Team.jsx'
import CTASection from '../sections/CTASection.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProperties />
      <Services />
      <WhyChoose />
      <Team />
      <CTASection />
    </>
  )
}
