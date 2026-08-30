import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import ContactModal from '@/components/ui/ContactModal'
import {
  TelegramIcon,
  YouTubeIcon,
  TikTokIcon,
  WhatsAppIcon,
  MAXIcon,
  VKIcon,
} from '@/components/ui/SocialIcons'
import Ava from '@/utils/Ava.png'

const Hero: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const socialLinks = [
    { name: 'MAX', icon: <MAXIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#1a2a4a]' },
    { name: 'VK', icon: <VKIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#4a76a8]' },
    { name: 'YouTube', icon: <YouTubeIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#ff0000]' },
    { name: 'TikTok', icon: <TikTokIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#010101]' },
    { name: 'Telegram', icon: <TelegramIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#0088cc]' },
    { name: 'WhatsApp', icon: <WhatsAppIcon className="w-6 h-6" />, href: '#', color: 'hover:bg-[#25d366]' },
  ]

  return (
    <>
      <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <Container className="relative z-10 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          >
            {/* Левая часть — фото и соцсети */}
            <motion.div
              variants={itemVariants}
              className="lg:w-2/5 flex-shrink-0 flex flex-col items-center"
            >
              {/* Фото */}
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-1.5 mx-auto shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                    <img
                      src={Ava}
                      alt="Басалаев Иван"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Бейдж "Репетитор по химии" под фото */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="mt-4 bg-[#f59e0b] text-[#1a2a4a] font-bold text-lg md:text-xl px-6 py-2.5 rounded-full shadow-lg"
              >
                🧪 Репетитор по химии и математике
              </motion.div>

              {/* Соцсети под фото */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3 mt-5"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-[#1a2a4a]/10 flex items-center justify-center text-[#1a2a4a] transition-all duration-300 ${social.color} hover:scale-110 hover:text-white hover:bg-opacity-100`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Правая часть — текст */}
            <motion.div
              variants={itemVariants}
              className="lg:w-3/5 text-center lg:text-left"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a2a4a] mb-3"
              >
                Басалаев Иван
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-3xl md:text-4xl text-[#1a2a4a] font-medium mb-5"
              >
                Подготовлю к ОГЭ и ЕГЭ по химии на{' '}
                <span className="text-[#f59e0b] font-bold">высокий балл</span>
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-xl md:text-2xl max-w-xl mx-auto lg:mx-0 mb-8"
              >
                Без стресса и зубрёжки. Индивидуальный подход к каждому ученику.
                Результат уже через <span className="text-[#f59e0b] font-semibold">3 месяца</span>.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-12 mb-10"
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#f59e0b]">15</p>
                  <p className="text-base text-gray-500 font-medium">Учеников подготовил</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#f59e0b]">3 года</p>
                  <p className="text-base text-gray-500 font-medium">Опыта работы</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#f59e0b]">МАГУ</p>
                  <p className="text-base text-gray-500 font-medium">Направление химия</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="animate-pulse-glow text-xl px-10 py-4"
                  onClick={() => setIsContactOpen(true)}
                >
                  📞 Связаться с Иваном
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mt-8 text-base text-gray-500"
              >
                <span className="flex items-center gap-2">✅ Онлайн-занятия</span>
                <span className="flex items-center gap-2">✅ Студент МАГУ</span>
                <span className="flex items-center gap-2">✅ Первое занятие бесплатно</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  )
}

export default Hero
