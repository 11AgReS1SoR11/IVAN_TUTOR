import React from 'react'
import Hero from '@/components/blocks/Hero'
import About from '@/components/blocks/About'
import Stats from '@/components/blocks/Stats'
import Services from '@/components/blocks/Services'
import HowItWorks from '@/components/blocks/HowItWorks'
import SocialProof from '@/components/blocks/SocialProof'
import Reviews from '@/components/blocks/Reviews'
import Calculator from '@/components/blocks/Calculator'
import FAQ from '@/components/blocks/FAQ'
import Footer from '@/components/blocks/Footer'

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-gray-50/50">
      <Hero />
      <Stats />
      <About />
      <Services />
      <HowItWorks />
      <SocialProof />
      <Reviews />
      <Calculator />
      <FAQ />
      <Footer />
    </main>
  )
}

export default App
