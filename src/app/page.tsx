import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ClientsSection from '@/components/ClientsSection'
import ServicesMarqueeSection from '@/components/ServicesMarqueeSection'
import ServicesSection from '@/components/ServicesSection'
import CreateYourOwnStorySection from '@/components/CreateYourOwnStorySection'
import CasesSection from '@/components/CasesSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import RecruitSection from '@/components/RecruitSection'
import AndStorySection from '@/components/AndStorySection'

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ClientsSection />
      <ServicesMarqueeSection />
      <ServicesSection />
      <CreateYourOwnStorySection />
      <CasesSection />
      <NewsSection />
      <ContactSection />
      <RecruitSection />
      <AndStorySection />
    </>
  )
}