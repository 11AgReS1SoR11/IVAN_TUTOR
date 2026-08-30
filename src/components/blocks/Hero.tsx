import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ContactModal from '@/components/ui/ContactModal'

const Hero: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-[#1a2a4a] relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-7xl"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🧪
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-7xl"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            📐
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-20 font-serif"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ∫
          </motion.div>
          <motion.div
            className="absolute top-1/4 right-1/4 text-4xl opacity-30"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            H₂O
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 left-1/4 text-4xl opacity-30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            E=mc²
          </motion.div>
        </div>

        <Container className="relative z-10 text-center">
          <motion.h1
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Иван Иванов
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#f59e0b] font-medium mb-2"
          >
            Репетитор по химии и математике
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Подготовлю к ОГЭ и ЕГЭ на нужный балл без стресса и зубрёжки
          </motion.p>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="animate-pulse-glow"
              onClick={() => setIsBookingOpen(true)}
            >
              🔥 Записаться на бесплатный пробный урок
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1">✅ Индивидуальный подход</span>
            <span className="flex items-center gap-1">✅ Поймёшь, а не запомнишь</span>
            <span className="flex items-center gap-1">✅ Результат за 3 месяца</span>
          </motion.div>

          {/* Индикатор скролла */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </Container>
      </section>

      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  )
}

export default Hero
