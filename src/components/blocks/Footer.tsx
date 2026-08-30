import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'
import {
  TelegramIcon,
  YouTubeIcon,
  TikTokIcon,
  VKIcon,
  WhatsAppIcon,
} from '@/components/ui/SocialIcons'

interface SocialLink {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: <TelegramIcon className="w-6 h-6" />,
    url: '#',
    color: 'hover:bg-[#0088cc]',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-6 h-6" />,
    url: '#',
    color: 'hover:bg-[#25d366]',
  },
  {
    id: 'vk',
    name: 'VK',
    icon: <VKIcon className="w-6 h-6" />,
    url: '#',
    color: 'hover:bg-[#4a76a8]',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <YouTubeIcon className="w-6 h-6" />,
    url: '#',
    color: 'hover:bg-[#ff0000]',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <TikTokIcon className="w-6 h-6" />,
    url: '#',
    color: 'hover:bg-[#010101]',
  },
]

const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isBookingOpen, setIsBookingOpen] = useState(false)

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
      } 
    },
  }

  return (
    <>
      <footer ref={ref} className="bg-[#1a2a4a]">
        {/* Финальный призыв */}
        <div className="relative overflow-hidden">
          <Container className="relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="py-16 md:py-20 text-center"
            >
              {/* Заголовок с золотой линией */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-4"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '80px' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-[#f59e0b] rounded-full"
                />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Не откладывай подготовку на последний вечер
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-lg md:text-xl mb-6"
              >
                Осталось мест на этот месяц:{' '}
                <span className="text-[#f59e0b] font-bold text-3xl">2 из 5</span>
              </motion.p>

              {/* Бонусы */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-2">🎁</div>
                  <p className="text-sm font-medium">Бесплатный пробный урок</p>
                  <p className="text-xs text-gray-400 mt-1">Познакомимся и определим уровень</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-sm font-medium">Диагностика знаний</p>
                  <p className="text-xs text-gray-400 mt-1">Выявим пробелы и составим план</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-2">📚</div>
                  <p className="text-sm font-medium">Чек-лист по химии</p>
                  <p className="text-xs text-gray-400 mt-1">Все правила для ОГЭ и ЕГЭ</p>
                </div>
              </motion.div>

              {/* Кнопка */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="lg"
                  className="animate-pulse-glow text-base md:text-lg px-8 md:px-12 py-4"
                  onClick={() => setIsBookingOpen(true)}
                >
                  📞 Связаться с Иваном
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </div>

        {/* Нижняя часть с контактами */}
        <div className="border-t border-white/10">
          <Container>
            <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Информация о репетиторе */}
              <div className="text-center md:text-left">
                <p className="text-white font-bold text-lg">Басалаев Иван</p>
                <p className="text-gray-400 text-sm">Репетитор по химии</p>
              </div>

              {/* Соцсети */}
              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:text-white hover:bg-opacity-100`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Контакты */}
              <div className="text-center md:text-right text-sm">
                <p className="text-gray-400">
                  📞{' '}
                  <a 
                    href="tel:+79991234567" 
                    className="text-white hover:text-[#f59e0b] transition-colors font-medium"
                  >
                    +7 (999) 123-45-67
                  </a>
                </p>
                <p className="text-gray-400 mt-1">
                  ✉️{' '}
                  <a 
                    href="mailto:ivan@tutor.ru" 
                    className="text-white hover:text-[#f59e0b] transition-colors font-medium"
                  >
                    ivan@tutor.ru
                  </a>
                </p>
              </div>
            </div>

            {/* Копирайт */}
            <div className="border-t border-white/5 py-4 text-center text-xs text-gray-500">
              <p>© 2026 Басалаев Иван. Все права защищены.</p>
            </div>
          </Container>
        </div>
      </footer>

      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  )
}

export default Footer
