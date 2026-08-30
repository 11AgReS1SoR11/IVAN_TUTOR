import React from 'react'
import Hero from '@/components/blocks/Hero'
import Stats from '@/components/blocks/Stats'
import About from '@/components/blocks/About'
import Services from '@/components/blocks/Services'
import HowItWorks from '@/components/blocks/HowItWorks'
import SocialProof from '@/components/blocks/SocialProof'
import Reviews from '@/components/blocks/Reviews'
import FAQ from '@/components/blocks/FAQ'
import Calculator from '@/components/blocks/Calculator'
import Footer from '@/components/blocks/Footer'

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
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
