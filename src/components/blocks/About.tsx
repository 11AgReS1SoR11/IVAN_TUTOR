import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import DiplomaModal from '@/components/ui/DiplomaModal'

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false)

  const features = [
    {
      icon: '🎓',
      title: 'Образование МАГУ',
      desc: 'Студент направления химия. Глубокое понимание предмета и актуальных требований.',
      gradient: 'from-blue-50 to-blue-100/50',
    },
    {
      icon: '🔬',
      title: 'Практический подход',
      desc: 'Учу решать задачи, а не зубрить. Всё объясняю простым и понятным языком.',
      gradient: 'from-green-50 to-green-100/50',
    },
    {
      icon: '💻',
      title: 'Современные технологии',
      desc: 'Интерактивная доска, видео-материалы, чат для вопросов 24/7.',
      gradient: 'from-purple-50 to-purple-100/50',
    },
    {
      icon: '🧠',
      title: 'Индивидуальный подход',
      desc: 'Программа под каждого ученика. Никакого шаблонного обучения.',
      gradient: 'from-orange-50 to-orange-100/50',
    },
  ]

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
        ease: 'easeOut',
      } 
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
      } 
    },
  }

  return (
    <>
      <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="max-w-4xl mx-auto"
          >
            {/* Заголовок с анимированной линией */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '80px' } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="h-1 bg-[#f59e0b] mx-auto mb-4 rounded-full"
              />
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2a4a] mb-4"
              >
                Почему стоит выбрать меня?
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
              >
                Я помогаю понять, а не просто выучить
              </motion.p>
            </motion.div>

            {/* Карточки преимуществ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-white/50`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.3 + index * 0.15,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="text-4xl flex-shrink-0"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                        className="font-bold text-[#1a2a4a] text-xl mb-1"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                        className="text-gray-600 text-base leading-relaxed"
                      >
                        {item.desc}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Кнопка с дипломами */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white transition-all duration-300"
                  onClick={() => setIsDiplomaModalOpen(true)}
                >
                  📜 Посмотреть дипломы и сертификаты
                </Button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-sm text-gray-400 mt-3"
              >
                Все документы подтверждают мою квалификацию
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <DiplomaModal
        isOpen={isDiplomaModalOpen}
        onClose={() => setIsDiplomaModalOpen(false)}
      />
    </>
  )
}

export default About