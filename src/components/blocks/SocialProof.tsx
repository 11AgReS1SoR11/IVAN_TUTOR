import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface SocialPost {
  id: string
  platform: 'telegram' | 'youtube' | 'vk' | 'instagram'
  platformIcon: string
  title: string
  description: string
  url: string
  date: string
  thumbnail?: string
}

const postsData: SocialPost[] = [
  {
    id: '1',
    platform: 'telegram',
    platformIcon: '📱',
    title: 'Как решать задачу №34 по химии за 5 минут',
    description: 'Разбор сложного задания с пошаговым алгоритмом решения',
    url: '#',
    date: '2 дня назад',
  },
  {
    id: '2',
    platform: 'youtube',
    platformIcon: '▶️',
    title: 'Теория вероятностей для чайников',
    description: 'Разбираем все типы задач из ЕГЭ по математике',
    url: '#',
    date: '5 дней назад',
  },
  {
    id: '3',
    platform: 'vk',
    platformIcon: '💬',
    title: 'Органика — это просто!',
    description: 'Схемы и лайфхаки для запоминания органических реакций',
    url: '#',
    date: '1 неделя назад',
  },
  {
    id: '4',
    platform: 'instagram',
    platformIcon: '📸',
    title: 'Топ-10 ошибок на ЕГЭ по математике',
    description: 'Короткие видео-разборы в Stories',
    url: '#',
    date: '1 неделя назад',
  },
]

const SocialProof: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a4a] mb-3">
            Полезные разборы в соцсетях
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Регулярно выкладываю разборы сложных заданий. Подписывайся, чтобы быть в курсе!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {postsData.map((post, index) => (
            <SocialCard
              key={post.id}
              post={post}
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Призыв подписаться */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-600 mb-4">
            📲 Следи за новыми разборами в моих соцсетях
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm">
              📱 Telegram
            </Button>
            <Button variant="outline" size="sm">
              ▶️ YouTube
            </Button>
            <Button variant="outline" size="sm">
              💬 VK
            </Button>
            <Button variant="outline" size="sm">
              📸 Instagram
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

interface SocialCardProps {
  post: SocialPost
  isInView: boolean
  delay: number
}

const SocialCard: React.FC<SocialCardProps> = ({ post, isInView, delay }) => {
  const platformColors: Record<SocialPost['platform'], string> = {
    telegram: 'from-blue-500 to-blue-600',
    youtube: 'from-red-500 to-red-600',
    vk: 'from-blue-400 to-blue-500',
    instagram: 'from-purple-500 to-pink-500',
  }

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
    >
      <div className={`bg-gradient-to-r ${platformColors[post.platform]} p-3 text-white`}>
        <div className="flex items-center justify-between">
          <span className="text-2xl">{post.platformIcon}</span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {post.date}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[#1a2a4a] text-sm mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2">
          {post.description}
        </p>
        <div className="mt-3 flex items-center text-[#f59e0b] text-xs font-medium">
          Читать разбор →
        </div>
      </div>
    </motion.a>
  )
}

export default SocialProof
