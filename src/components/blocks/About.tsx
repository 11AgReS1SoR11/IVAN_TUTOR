import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import DiplomaModal from './DiplomaModal'

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isDiplomaModalOpen, setIsDiplomaModalOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      <section ref={ref} className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Фото */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/3 flex-shrink-0"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#1a2a4a] to-[#f59e0b] p-1 mx-auto">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {/* TODO: Заменить на реальное фото Ивана */}
                    <div className="text-8xl">👨‍🏫</div>
                  </div>
                </div>
                {/* Декоративные элементы */}
                <motion.div
                  className="absolute -top-4 -right-4 text-4xl"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🧪
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 text-4xl"
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  📐
                </motion.div>
              </div>
            </motion.div>

            {/* Текст */}
            <motion.div
              variants={itemVariants}
              className="lg:w-2/3"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a4a] mb-4">
                Меня зовут Иван,{' '}
                <span className="text-[#f59e0b]">
                  и я люблю объяснять сложное простыми словами
                </span>
              </h2>

              <p className="text-gray-600 text-lg mb-6">
                Я помогу тебе не просто сдать экзамен, а действительно понять
                предмет. Потому что химия и математика — это не про зубрёжку,
                а про логику и красоту мышления.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl flex-shrink-0 mt-0.5">✅</span>
                  <span className="text-gray-700">
                    <strong>Окончил Химфак МГУ</strong> (красный диплом)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl flex-shrink-0 mt-0.5">✅</span>
                  <span className="text-gray-700">
                    <strong>Эксперт ОГЭ и ЕГЭ</strong> — знаю все ловушки и подводные камни
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl flex-shrink-0 mt-0.5">✅</span>
                  <span className="text-gray-700">
                    <strong>Преподаю онлайн</strong> с виртуальной доской — как будто мы за одной партой
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl flex-shrink-0 mt-0.5">✅</span>
                  <span className="text-gray-700">
                    <strong>Нахожу подход</strong> даже к тем, кто говорит «математика — это не моё»
                  </span>
                </li>
              </ul>

              <Button
                variant="outline"
                onClick={() => setIsDiplomaModalOpen(true)}
              >
                📜 Посмотреть диплом и сертификаты
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Модальное окно с дипломами */}
      <DiplomaModal
        isOpen={isDiplomaModalOpen}
        onClose={() => setIsDiplomaModalOpen(false)}
      />
    </>
  )
}

export default About
