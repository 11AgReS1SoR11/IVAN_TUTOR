import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContactModal from '@/components/ui/ContactModal'

type Subject = 'chemistry' | 'math'
type Format = 'individual' | 'group'

interface PricingConfig {
  subject: Subject
  format: Format
  pricePerHour: number
  label: string
}

const pricingConfigs: PricingConfig[] = [
  { subject: 'chemistry', format: 'individual', pricePerHour: 1500, label: 'Индивидуально' },
  { subject: 'chemistry', format: 'group', pricePerHour: 800, label: 'Мини-группа (3-5 чел)' },
  { subject: 'math', format: 'individual', pricePerHour: 1500, label: 'Индивидуально' },
  { subject: 'math', format: 'group', pricePerHour: 800, label: 'Мини-группа (3-5 чел)' },
]

const subjectLabels: Record<Subject, string> = {
  chemistry: '🧪 Химия',
  math: '📐 Математика',
}

const formatLabels: Record<Format, string> = {
  individual: '👤 Индивидуально',
  group: '👨‍👩‍👧‍👦 Мини-группа',
}

const Calculator: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const [subject, setSubject] = useState<Subject>('chemistry')
  const [format, setFormat] = useState<Format>('individual')
  const [sessionsPerWeek, setSessionsPerWeek] = useState<number>(2)
  const [duration, setDuration] = useState<number>(60)

  const getPrice = (): number => {
    const config = pricingConfigs.find(
      (c) => c.subject === subject && c.format === format
    )
    if (!config) return 0

    const hourlyRate = config.pricePerHour
    const hoursPerSession = duration / 60
    const sessionsPerMonth = sessionsPerWeek * 4

    return Math.round(hourlyRate * hoursPerSession * sessionsPerMonth)
  }

  const totalPrice = getPrice()
  const hasDiscount = sessionsPerWeek >= 3
  const discountedPrice = hasDiscount ? Math.round(totalPrice * 0.9) : totalPrice

  const handleBook = () => {
    setIsBookingOpen(true)
  }

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
        duration: 0.6
      } 
    },
  }

  return (
    <>
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
              Рассчитай стоимость занятий
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Выбери параметры и узнай цену прямо сейчас
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-6 md:p-8">
              {/* Выбор предмета */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Предмет
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['chemistry', 'math'] as Subject[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSubject(s)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        subject === s
                          ? 'border-[#f59e0b] bg-[#f59e0b]/10 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`text-2xl font-medium block ${subject === s ? 'text-[#1a2a4a]' : 'text-gray-600'}`}>
                        {subjectLabels[s]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Выбор формата */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Формат занятий
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['individual', 'group'] as Format[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        format === f
                          ? 'border-[#f59e0b] bg-[#f59e0b]/10 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium block">
                        {formatLabels[f]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Количество занятий в неделю */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Занятий в неделю: <span className="text-[#f59e0b]">{sessionsPerWeek}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={sessionsPerWeek}
                    onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                {/* Длительность занятия */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Длительность: <span className="text-[#f59e0b]">{duration} мин</span>
                  </label>
                  <div className="flex gap-2">
                    {[45, 60, 90, 120].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          duration === d
                            ? 'border-[#f59e0b] bg-[#f59e0b]/10 text-[#1a2a4a]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {d} мин
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Итоговая цена */}
              <motion.div
                key={`${subject}-${format}-${sessionsPerWeek}-${duration}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] rounded-xl p-6 text-white text-center"
              >
                <p className="text-sm text-gray-300 mb-1">Стоимость в месяц:</p>
                <div className="flex items-center justify-center gap-4">
                  {hasDiscount ? (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        {totalPrice.toLocaleString()} ₽
                      </span>
                      <span className="text-4xl md:text-5xl font-bold text-[#f59e0b]">
                        {discountedPrice.toLocaleString()} ₽
                      </span>
                      <span className="bg-[#f59e0b] text-[#1a2a4a] text-xs font-bold px-2 py-1 rounded-full">
                        -10%
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold text-[#f59e0b]">
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {sessionsPerWeek} занятий × {duration} мин × 4 недели
                  {hasDiscount && ' (скидка за абонемент)'}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                  <span className="bg-white/10 px-3 py-1 rounded-full">
                    {subjectLabels[subject]}
                  </span>
                  <span className="bg-white/10 px-3 py-1 rounded-full">
                    {formatLabels[format]}
                  </span>
                </div>
              </motion.div>

              {/* Кнопка записи */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                  onClick={handleBook}
                >
                  📞 Связаться с Иваном
                </Button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  * Первое занятие — бесплатно!
                </p>
              </motion.div>
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

export default Calculator
