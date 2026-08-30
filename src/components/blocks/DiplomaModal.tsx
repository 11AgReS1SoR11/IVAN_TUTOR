import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/ui/Modal'

interface Diploma {
  id: string
  title: string
  description: string
  year: string
  type: 'diploma' | 'certificate' | 'achievement'
  icon: string
  details?: string
}

const diplomasData: Diploma[] = [
  {
    id: '1',
    title: 'Диплом МГУ',
    description: 'Химический факультет, красный диплом',
    year: '2018',
    type: 'diploma',
    icon: '🎓',
    details: 'Специальность: Химия. Средний балл: 4.9',
  },
  {
    id: '2',
    title: 'Сертификат эксперта ЕГЭ',
    description: 'Экспертная комиссия по химии',
    year: '2022',
    type: 'certificate',
    icon: '📜',
    details: 'Право проверки развёрнутых ответов ЕГЭ по химии',
  },
  {
    id: '3',
    title: 'Повышение квалификации',
    description: 'Современные методики преподавания химии',
    year: '2023',
    type: 'certificate',
    icon: '📖',
    details: 'Курс: "Интерактивные методы обучения естественным наукам"',
  },
  {
    id: '4',
    title: 'Победитель конкурса',
    description: 'Лучший репетитор года — 2023',
    year: '2023',
    type: 'achievement',
    icon: '🏆',
    details: 'Награждён ассоциацией репетиторов России',
  },
  {
    id: '5',
    title: 'Сертификат эксперта ОГЭ',
    description: 'Экспертная комиссия по математике',
    year: '2021',
    type: 'certificate',
    icon: '📜',
    details: 'Право проверки развёрнутых ответов ОГЭ по математике',
  },
  {
    id: '6',
    title: 'Магистратура МГУ',
    description: 'Химический факультет, магистр',
    year: '2020',
    type: 'diploma',
    icon: '🎓',
    details: 'Научная работа: "Каталитические процессы в органической химии"',
  },
]

interface DiplomaModalProps {
  isOpen: boolean
  onClose: () => void
}

const DiplomaModal: React.FC<DiplomaModalProps> = ({ isOpen, onClose }) => {
  const [selectedDiploma, setSelectedDiploma] = useState<Diploma | null>(null)

  const typeColors: Record<Diploma['type'], string> = {
    diploma: 'from-[#1a2a4a] to-[#2a3a5a]',
    certificate: 'from-[#f59e0b] to-[#d97706]',
    achievement: 'from-purple-500 to-pink-500',
  }

  const typeLabels: Record<Diploma['type'], string> = {
    diploma: 'Диплом',
    certificate: 'Сертификат',
    achievement: 'Достижение',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Дипломы и сертификаты" size="xl">
      {/* Галерея дипломов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {diplomasData.map((diploma) => (
          <motion.div
            key={diploma.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedDiploma(diploma)}
          >
            <div className={`bg-gradient-to-r ${typeColors[diploma.type]} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{diploma.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm">{diploma.title}</h4>
                    <p className="text-xs opacity-90">{diploma.year}</p>
                  </div>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {typeLabels[diploma.type]}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">{diploma.description}</p>
              <button className="mt-3 text-[#f59e0b] text-sm font-medium hover:text-[#d97706] transition-colors flex items-center gap-1">
                Подробнее →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Детальный просмотр */}
      <AnimatePresence>
        {selectedDiploma && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDiploma(null)}
          >
            <motion.div
              className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{selectedDiploma.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a2a4a]">
                      {selectedDiploma.title}
                    </h3>
                    <p className="text-sm text-gray-500">{selectedDiploma.year}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDiploma(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={`bg-gradient-to-r ${typeColors[selectedDiploma.type]} rounded-xl p-4 text-white mb-4`}>
                <p className="font-medium">{selectedDiploma.description}</p>
              </div>

              {selectedDiploma.details && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Подробности:</span> {selectedDiploma.details}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedDiploma(null)}
                className="w-full py-2 bg-[#1a2a4a] text-white rounded-lg hover:bg-[#0f172a] transition-colors font-medium"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Подпись внизу */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
        🎓 Все документы представлены для подтверждения квалификации
      </div>
    </Modal>
  )
}

export default DiplomaModal
