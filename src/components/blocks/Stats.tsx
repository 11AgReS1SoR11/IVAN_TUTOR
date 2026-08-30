import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import { useCountUp } from '@/hooks/useCountUp'

interface StatItem {
  id: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  icon: string
}

const statsData: StatItem[] = [
  {
    id: '1',
    value: 90,
    suffix: '+',
    label: 'Средний балл ЕГЭ по химии',
    icon: '🧪',
  },
  {
    id: '2',
    value: 85,
    suffix: '+',
    label: 'Средний балл ЕГЭ по математике',
    icon: '📐',
  },
  {
    id: '3',
    value: 120,
    label: 'Всего подготовленных учеников',
    icon: '👨‍🎓',
  },
  {
    id: '4',
    value: 100,
    suffix: '%',
    label: 'Сдача ОГЭ без «троек»',
    icon: '🏆',
  },
]

const Stats: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#1a2a4a] mb-12"
        >
          Мои ученики поступают в топовые вузы
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              isInView={isInView}
              delay={index * 0.15}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

interface StatCardProps {
  stat: StatItem
  isInView: boolean
  delay: number
}

const StatCard: React.FC<StatCardProps> = ({ stat, isInView, delay }) => {
  const count = useCountUp({
    start: 0,
    end: stat.value,
    duration: 2000,
    delay: 300 + delay * 1000,
    trigger: isInView,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100"
    >
      <div className="text-4xl md:text-5xl mb-3">{stat.icon}</div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f59e0b] mb-1">
        {isInView ? (
          <>
            {stat.prefix}
            {count}
            {stat.suffix}
          </>
        ) : (
          <>
            {stat.prefix}0{stat.suffix}
          </>
        )}
      </div>
      <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
    </motion.div>
  )
}

export default Stats
