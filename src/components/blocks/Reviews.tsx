import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Review {
  id: string
  author: string
  role: 'ученик' | 'родитель'
  text: string
  rating: number
  date: string
  result?: string
  photo?: string
}

const reviewsData: Review[] = [
  {
    id: '1',
    author: 'Елена',
    role: 'родитель',
    text: 'Сын начал заниматься с Иваном в октябре, химия была на 40 баллов. За 7 месяцев он вышел на 82 балла! Иван смог объяснить органику за 3 встречи, хотя в школе это проходили полгода. Очень рекомендуем!',
    rating: 5,
    date: 'Июнь 2024',
    result: 'ЕГЭ: 82 балла → +42 балла',
    photo: '👩',
  },
  {
    id: '2',
    author: 'Артём',
    role: 'ученик',
    text: 'Математика всегда была моим слабым местом. Иван нашёл ко мне подход, объяснял на пальцах и не давал опускать руки. В итоге ЕГЭ сдал на 88 баллов, хотя в начале года боялся, что даже порог не перешагну.',
    rating: 5,
    date: 'Июнь 2024',
    result: 'ЕГЭ: 88 баллов',
    photo: '👨‍🎓',
  },
  {
    id: '3',
    author: 'Марина',
    role: 'родитель',
    text: 'Дочь готовилась к ОГЭ по химии. Были большие проблемы, но Иван смог заинтересовать предметом. Результат — 5 на экзамене! И главное, дочь теперь хочет сдавать химию на ЕГЭ. Спасибо!',
    rating: 5,
    date: 'Май 2024',
    result: 'ОГЭ: 5 (отлично)',
    photo: '👩‍🦰',
  },
]

const Reviews: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length)
  }

  const currentReview = reviewsData[currentIndex]

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#1a2a4a]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Что говорят мои ученики и их родители
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Реальные отзывы от реальных людей
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Основной слайд */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{currentReview.photo}</div>
                <div>
                  <h4 className="font-bold text-[#1a2a4a] text-lg">
                    {currentReview.author}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {currentReview.role} • {currentReview.date}
                  </p>
                </div>
                <div className="ml-auto text-[#f59e0b] text-xl">
                  {'⭐'.repeat(currentReview.rating)}
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed italic">
                «{currentReview.text}»
              </p>

              {currentReview.result && (
                <div className="mt-4 inline-block bg-[#f59e0b] bg-opacity-10 border border-[#f59e0b] rounded-lg px-4 py-2">
                  <p className="text-[#f59e0b] font-semibold text-sm">
                    📈 {currentReview.result}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Навигация */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="text-white border-white hover:bg-white hover:text-[#1a2a4a]"
            >
              ←
            </Button>

            <div className="flex gap-2">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#f59e0b] w-8'
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="text-white border-white hover:bg-white hover:text-[#1a2a4a]"
            >
              →
            </Button>
          </div>
        </div>

        {/* Бонус: Все отзывы */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            size="sm"
            className="text-white border-gray-400 hover:border-white hover:bg-white hover:text-[#1a2a4a]"
            onClick={() => {
              console.log('Показать все отзывы')
            }}
          >
            Посмотреть все отзывы →
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

export default Reviews
