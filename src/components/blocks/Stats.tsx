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
    value: 15,
    label: 'Всего подготовленных учеников',
    icon: '👨‍🎓',
  },
  {
    id: '2',
    value: 3,
    suffix: '+',
    label: 'Лет опыта работы',
    icon: '⏳',
  },
  {
    id: '3',
    value: 100,
    suffix: '%',
    label: 'Сдача ОГЭ без «троек»',
    icon: '🏆',
  },
  {
    id: '4',
    value: 80,
    suffix: '+',
    label: 'Средний балл учеников на ЕГЭ',
    icon: '📈',
  },
]

const Stats: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  return (
    <section ref={ref} className="py-16 md:py-24 bg-transparent">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2a4a] mb-3"
          >
            Мои результаты в цифрах
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Цифры говорят сами за себя
          </motion.p>
        </motion.div>

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
      whileHover={{ y: -4, scale: 1.03 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100"
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
