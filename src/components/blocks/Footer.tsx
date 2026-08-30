import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'

interface SocialLink {
  id: string
  name: string
  icon: string
  url: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '📱',
    url: '#',
    color: 'hover:bg-blue-500',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    url: '#',
    color: 'hover:bg-green-500',
  },
  {
    id: 'vk',
    name: 'VK',
    icon: '💙',
    url: '#',
    color: 'hover:bg-blue-400',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '▶️',
    url: '#',
    color: 'hover:bg-red-500',
  },
]

const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <footer ref={ref} className="bg-[#1a2a4a]">
        {/* Финальный призыв */}
        <div className="relative overflow-hidden">
          {/* Декоративный фон */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 text-8xl">∫</div>
            <div className="absolute bottom-0 right-0 text-8xl">🧪</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
              π
            </div>
          </div>

          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="py-16 md:py-20 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Не откладывай подготовку на последний вечер
              </h2>

              <p className="text-gray-300 text-lg mb-6">
                Осталось мест на этот месяц:{' '}
                <span className="text-[#f59e0b] font-bold text-2xl">2 из 5</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/10"
                >
                  <div className="text-3xl mb-2">🎁</div>
                  <p className="text-sm font-medium">Бесплатный пробный урок</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/10"
                >
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-sm font-medium">Диагностика знаний в подарок</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white border border-white/10"
                >
                  <div className="text-3xl mb-2">📚</div>
                  <p className="text-sm font-medium">Чек-лист всех правил по химии</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="animate-pulse-glow text-base md:text-lg px-8 md:px-12"
                  onClick={() => setIsBookingOpen(true)}
                >
                  🔥 Записаться на пробный урок
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </div>

        {/* Нижняя часть с контактами */}
        <div className="border-t border-white/10">
          <Container>
            <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-white font-bold text-lg">Иван Иванов</p>
                <p className="text-gray-400 text-sm">Репетитор по химии и математике</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="text-center md:text-right text-sm text-gray-400">
                <p>📞 <a href="tel:+79991234567" className="hover:text-[#f59e0b] transition-colors">+7 (999) 123-45-67</a></p>
                <p>✉️ <a href="mailto:ivan@tutor.ru" className="hover:text-[#f59e0b] transition-colors">ivan@tutor.ru</a></p>
              </div>
            </div>

            <div className="border-t border-white/5 py-4 text-center text-xs text-gray-500">
              <p>© 2026 Иван Иванов. Все права защищены.</p>
              <p className="mt-1">
                <a href="#" className="hover:text-[#f59e0b] transition-colors">Политика конфиденциальности</a>
              </p>
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
