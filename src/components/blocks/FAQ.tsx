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
    answer: 'Это идеальный ученик для меня! Начнём с самого начала, с 5-6 класса, постепенно заполним все пробелы. Я научу мыслить логически, а не просто зубрить. Главное — желание учиться, а с нуля начинать даже проще, чем переучивать.',
  },
  {
    id: '2',
    question: 'Можно ли перенести занятие?',
    answer: 'Да, конечно! Вы можете перенести занятие, предупредив меня не менее чем за 2 часа до начала урока. В этом случае оплата не сгорает, и мы просто переносим занятие на удобное для вас время.',
  },
  {
    id: '3',
    question: 'Как оплачивать занятия?',
    answer: 'У меня два варианта оплаты: 1) Постоплата за прошедший месяц — вы платите в конце месяца за проведённые занятия. 2) Предоплата за абонемент на 8 занятий со скидкой 10%. Выбирайте удобный для вас вариант!',
  },
  {
    id: '4',
    question: 'Сколько длятся занятия?',
    answer: 'Стандартное занятие длится 60 минут. Но для учеников 9-11 классов, готовящихся к ОГЭ и ЕГЭ, рекомендую занятия по 90 минут — так мы успеваем и теорию разобрать, и задачи порешать. Стоимость 90-минутного занятия — 2000 ₽.',
  },
  {
    id: '5',
    question: 'Какое оборудование нужно для онлайн-занятий?',
    answer: 'Всё, что нужно — это компьютер или ноутбук с веб-камерой и микрофоном, а также стабильный интернет. Я использую онлайн-доску Miro, Zoom/Skype для видеосвязи. Все материалы и домашние задания я отправляю в удобном для вас мессенджере.',
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
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ответы на самые популярные вопросы
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              isInView={isInView}
              delay={index * 0.1}
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
      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-[#f59e0b] transition-colors duration-200"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-[#1a2a4a] text-lg pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#f59e0b] text-2xl flex-shrink-0"
        >
          {isOpen ? '−' : '+'}
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
            <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQ
