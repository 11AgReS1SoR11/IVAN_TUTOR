import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'

interface Step {
  id: string
  number: number
  icon: string
  title: string
  description: string
}

const stepsData: Step[] = [
  {
    id: '1',
    number: 1,
    icon: '📝',
    title: 'Знакомство',
    description: 'Бесплатный 15-минутный созвон. Определяем уровень, цели и просто знакомимся друг с другом',
  },
  {
    id: '2',
    number: 2,
    icon: '🗓️',
    title: 'План',
    description: 'Я составляю персональную траекторию подготовки под твой бюджет времени и цели',
  },
  {
    id: '3',
    number: 3,
    icon: '💻',
    title: 'Занятия',
    description: 'Работаем на современной онлайн-доске. Ты видишь каждую формулу, я вижу твоё решение в реальном времени',
  },
  {
    id: '4',
    number: 4,
    icon: '📊',
    title: 'ДЗ и отчёт',
    description: 'После каждого урока — домашнее задание с автопроверкой и подробный отчёт для родителей',
  },
]

const HowItWorks: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a4a] mb-3">
            Всего 4 шага до твоей пятёрки
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Простая и прозрачная система обучения
          </p>
        </motion.div>

        <div className="relative">
          {/* Соединительная линия (для десктопа) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-200 -translate-y-1/2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-[#f59e0b] origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {stepsData.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                isInView={isInView}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

interface StepCardProps {
  step: Step
  isInView: boolean
  delay: number
}

const StepCard: React.FC<StepCardProps> = ({ step, isInView, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Номер шага */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white text-3xl font-bold shadow-lg relative z-10">
          {step.number}
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-[#f59e0b] opacity-20"
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
      </div>

      {/* Иконка */}
      <div className="text-4xl mb-3">{step.icon}</div>

      {/* Текст */}
      <h3 className="text-xl font-bold text-[#1a2a4a] mb-2">{step.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  )
}

export default HowItWorks
