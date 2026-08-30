import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'
import {
  TelegramIcon,
  YouTubeIcon,
  TikTokIcon,
  VKIcon,
} from '@/components/ui/SocialIcons'

interface SocialLink {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  color: string
  description: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: <TelegramIcon className="w-10 h-10" />,
    url: '#',
    color: 'from-blue-500 to-blue-600',
    description: 'Короткие разборы и лайфхаки',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <YouTubeIcon className="w-10 h-10" />,
    url: '#',
    color: 'from-red-500 to-red-600',
    description: 'Полные видео-уроки и вебинары',
  },
  {
    id: 'vk',
    name: 'VK',
    icon: <VKIcon className="w-10 h-10" />,
    url: '#',
    color: 'from-blue-400 to-blue-500',
    description: 'Статьи и полезные материалы',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <TikTokIcon className="w-10 h-10" />,
    url: '#',
    color: 'from-black to-gray-800',
    description: 'Короткие видео с объяснениями',
  },
]

const SocialProof: React.FC = () => {
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
            Полезный контент в соцсетях
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Подписывайся, чтобы быть в курсе новых разборов и полезных материалов
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {socialLinks.map((social, index) => (
            <SocialCard
              key={social.id}
              social={social}
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
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="bg-[#f59e0b] bg-opacity-10 border-2 border-[#f59e0b] border-dashed rounded-xl p-5 text-center hover:bg-opacity-15 transition-all duration-300">
            <p className="text-[#1a2a4a] font-semibold text-lg">
              Подписывайся и учи химию и математику с удовольствием!
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

interface SocialCardProps {
  social: SocialLink
  isInView: boolean
  delay: number
}

const SocialCard: React.FC<SocialCardProps> = ({ social, isInView, delay }) => {
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block border border-gray-100 group"
    >
      <div className={`bg-gradient-to-r ${social.color} p-5 text-white text-center flex flex-col items-center`}>
        <div className="w-14 h-14 flex items-center justify-center text-white">
          {social.icon}
        </div>
        <h3 className="text-xl font-bold mt-1">{social.name}</h3>
      </div>

      <div className="p-5 text-center">
        <p className="text-gray-600 text-sm leading-relaxed">
          {social.description}
        </p>
        <div className="mt-3 inline-flex items-center text-[#f59e0b] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
          Перейти →
        </div>
      </div>
    </motion.a>
  )
}

export default SocialProof
