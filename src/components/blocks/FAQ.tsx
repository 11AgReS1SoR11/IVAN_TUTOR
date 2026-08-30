import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Что делать, если у ребёнка нет знаний совсем?',
    answer: 'Это идеальный ученик для меня! Начнём с самого начала, с 5-6 класса, постепенно заполним все пробелы. Я научу мыслить логически, а не просто зубрить. Главное - желание учиться, а с нуля начинать даже проще, чем переучивать.',
  },
  {
    id: '2',
    question: 'Можно ли перенести занятие?',
    answer: 'Да, конечно! Вы можете перенести занятие, предупредив меня не менее чем за 2 часа до начала урока. В этом случае оплата не сгорает, и мы просто переносим занятие на удобное для вас время.',
  },
  {
    id: '3',
    question: 'Как оплачивать занятия?',
    answer: 'Я работаю по предоплате, и занятия не сгорают. Как только провели все оплаченные занятия, просто оплатите следующие. Предоплата за абонемент на 8 занятий со скидкой 10%. Выбирайте удобный для вас вариант!',
  },
  {
    id: '4',
    question: 'Сколько длятся занятия?',
    answer: 'Стандартное занятие длится 60 минут. Для учеников 9-11 классов, готовящихся к ОГЭ и ЕГЭ, рекомендую занятия по 90 минут — так мы успеваем и теорию разобрать, и задачи порешать.',
  },
  {
    id: '5',
    question: 'Какое оборудование нужно для онлайн-занятий?',
    answer: 'Всё, что нужно — это компьютер или ноутбук с веб-камерой и микрофоном, а также стабильный интернет. Я использую онлайн-доску для совместной работы, Zoom или Telegram для видеосвязи. Все материалы и домашние задания я отправляю в удобном для вас мессенджере.',
  },
  {
    id: '6',
    question: 'Есть ли пробное занятие?',
    answer: 'Да! Первое занятие — бесплатное. Это 15-20 минут, где мы знакомимся, определяем текущий уровень знаний, обсуждаем цели и составляем план подготовки. Вы можете убедиться, что мой подход вам подходит, и только потом принимать решение.',
  },
]

const FAQ: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
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
            Часто задаваемые вопросы
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Ответы на самые популярные вопросы
          </motion.p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              isInView={isInView}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  isInView: boolean
  delay: number
}

const FAQItem: React.FC<FAQItemProps> = ({
  item,
  isOpen,
  onToggle,
  isInView,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`border rounded-xl overflow-hidden bg-white transition-all duration-300 ${
        isOpen 
          ? 'border-[#f59e0b] shadow-lg shadow-[#f59e0b]/10' 
          : 'border-gray-200 hover:border-[#f59e0b]/50'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors duration-200"
      >
        <span className={`font-semibold text-lg pr-4 transition-colors duration-200 ${
          isOpen ? 'text-[#f59e0b]' : 'text-[#1a2a4a]'
        }`}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
            isOpen 
              ? 'bg-[#f59e0b] text-white' 
              : 'bg-gray-100 text-[#1a2a4a] hover:bg-gray-200'
          }`}
        >
          <span className="text-xl font-light leading-none">
            {isOpen ? '−' : '+'}
          </span>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQ
