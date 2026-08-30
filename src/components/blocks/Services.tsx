import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'

interface ServiceCardProps {
  title: string
  icon: string
  exams: string[]
  price: string
  color: string
  delay: number
  isInView: boolean
  subject: 'chemistry' | 'math'
  onBook: (subject: 'chemistry' | 'math') => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  exams,
  price,
  color,
  delay,
  isInView,
  subject,
  onBook,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className={`p-6 ${color} text-white`}>
        <div className="text-5xl mb-3">{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <div className="p-6">
        <ul className="space-y-2 mb-6">
          {exams.map((exam, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="text-[#f59e0b]">▸</span>
              {exam}
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <span className="text-3xl font-bold text-[#1a2a4a]">{price}</span>
          <span className="text-gray-500 text-sm"> / 60 мин</span>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => onBook(subject)}
        >
          Хочу на {title.toLowerCase()}
        </Button>
      </div>
    </motion.div>
  )
}

const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<'chemistry' | 'math'>('chemistry')

  const services = [
    {
      title: 'Химия',
      icon: '🧪',
      exams: ['ОГЭ', 'ЕГЭ', 'Повышение успеваемости'],
      price: 'от 1 500 ₽',
      color: 'bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a]',
      subject: 'chemistry' as const,
    },
    {
      title: 'Математика',
      icon: '📐',
      exams: ['ОГЭ', 'ЕГЭ (база)', 'ЕГЭ (профиль)', 'Подготовка к ДВИ'],
      price: 'от 1 500 ₽',
      color: 'bg-gradient-to-br from-[#f59e0b] to-[#d97706]',
      subject: 'math' as const,
    },
  ]

  const handleBook = (subject: 'chemistry' | 'math') => {
    setSelectedSubject(subject)
    setIsBookingOpen(true)
  }

  return (
    <>
      <section ref={ref} className="py-16 md:py-24 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a4a] mb-3">
              Выбери свой предмет и формат
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Индивидуальная программа под твои цели и уровень подготовки
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                delay={index * 0.2}
                isInView={isInView}
                onBook={handleBook}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-[#f59e0b] bg-opacity-10 border-2 border-[#f59e0b] border-dashed rounded-xl p-4 text-center">
              <p className="text-[#1a2a4a] font-semibold text-lg">
                🎯 Скидка <span className="text-[#f59e0b] font-bold">10%</span> при оплате абонемента на 8 занятий
              </p>
            </div>
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

export default Services
