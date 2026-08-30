import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'

interface Review {
  id: string
  author: string
  role: 'ученик' | 'родитель'
  text: string
  rating: number
  date: string
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
    photo: '👩',
  },
  {
    id: '2',
    author: 'Артём',
    role: 'ученик',
    text: 'Математика всегда была моим слабым местом. Иван нашёл ко мне подход, объяснял на пальцах и не давал опускать руки. В итоге ЕГЭ сдал на 88 баллов, хотя в начале года боялся, что даже порог не перешагну.',
    rating: 5,
    date: 'Июнь 2024',
    photo: '👨‍🎓',
  },
  {
    id: '3',
    author: 'Марина',
    role: 'родитель',
    text: 'Дочь готовилась к ОГЭ по химии. Были большие проблемы, но Иван смог заинтересовать предметом. Результат — 5 на экзамене! И главное, дочь теперь хочет сдавать химию на ЕГЭ. Спасибо!',
    rating: 5,
    date: 'Май 2024',
    photo: '👩‍🦰',
  },
]

const Reviews: React.FC = () => {
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
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
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
            Что говорят мои ученики и их родители
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Реальные отзывы от реальных людей
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

interface ReviewCardProps {
  review: Review
  isInView: boolean
  delay: number
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isInView, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Шапка с автором и рейтингом */}
      <div className="flex items-center gap-3 mb-4">
        {/*<div className="text-4xl flex-shrink-0">{review.photo}</div>*/}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[#1a2a4a] text-lg">
            {review.author}
          </h4>
          <p className="text-gray-500 text-sm">
            {review.role} • {review.date}
          </p>
        </div>
        <div className="text-[#f59e0b] text-sm flex-shrink-0">
          {'⭐'.repeat(review.rating)}
        </div>
      </div>

      {/* Текст отзыва */}
      <p className="text-gray-700 text-base leading-relaxed italic flex-1">
        «{review.text}»
      </p>
    </motion.div>
  )
}

export default Reviews
