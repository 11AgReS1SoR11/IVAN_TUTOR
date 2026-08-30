// Типы для данных репетитора
export interface TutorInfo {
  name: string
  specialty: string
  experience: number
  education: string
  photo?: string
}

// Типы для услуг
export interface Service {
  id: string
  title: string
  subject: 'chemistry' | 'math'
  description: string
  price: number
  duration: number // в минутах
  exams: string[] // ['ОГЭ', 'ЕГЭ']
}

// Типы для отзывов
export interface Review {
  id: string
  author: string
  role: string // 'ученик' | 'родитель'
  text: string
  rating: number
  date: string
  photo?: string
  result?: string // 'ЕГЭ: 92 балла'
}

// Типы для FAQ
export interface FAQItem {
  id: string
  question: string
  answer: string
}

// Типы для статистики
export interface Stat {
  id: string
  value: string
  label: string
  icon: string
}

// Типы для социальных доказательств (разборы из соцсетей)
export interface SocialProof {
  id: string
  platform: 'telegram' | 'youtube' | 'vk' | 'instagram'
  title: string
  description: string
  url: string
  thumbnail?: string
  date: string
}
