import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const contactInfo = {
    name: 'Иван Иванов',
    phone: '+7 (999) 123-45-67',
    phoneRaw: '+79991234567',
    email: 'ivan@tutor.ru',
    telegram: '@ivan_tutor',
    whatsapp: '+7 (999) 123-45-67',
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }).catch(() => {
      // fallback для старых браузеров
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phoneRaw}`
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📞 Свяжитесь с Иваном" size="md">
      <div className="space-y-6">
        {/* Имя репетитора */}
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a2a4a]">{contactInfo.name}</p>
          <p className="text-gray-500 text-sm">Репетитор по химии и математике</p>
        </div>

        {/* Телефон */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-xs text-gray-400 font-medium">Телефон</p>
                <p className="text-lg font-semibold text-[#1a2a4a]">
                  {contactInfo.phone}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePhoneClick}
                className="p-2 bg-[#1a2a4a] text-white rounded-lg hover:bg-[#0f172a] transition-colors"
                title="Позвонить"
              >
                📞
              </button>
              <button
                onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                className="relative p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                title="Скопировать номер"
              >
                📋
                {copiedField === 'phone' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-fade-in">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email</p>
                <p className="text-lg font-semibold text-[#1a2a4a]">
                  {contactInfo.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEmailClick}
                className="p-2 bg-[#1a2a4a] text-white rounded-lg hover:bg-[#0f172a] transition-colors"
                title="Написать письмо"
              >
                ✉️
              </button>
              <button
                onClick={() => copyToClipboard(contactInfo.email, 'email')}
                className="relative p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                title="Скопировать email"
              >
                📋
                {copiedField === 'email' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-fade-in">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Мессенджеры */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <span className="text-xl">📱</span>
            <span className="font-medium">Telegram</span>
          </a>
          <a
            href={`https://wa.me/${contactInfo.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
          >
            <span className="text-xl">💬</span>
            <span className="font-medium">WhatsApp</span>
          </a>
        </div>

        {/* Подсказка */}
        <div className="bg-[#f59e0b]/10 border border-[#f59e0b] rounded-xl p-3 text-center">
          <p className="text-sm text-gray-600">
            💡 Нажмите на иконку <span className="font-semibold">📋</span>, чтобы скопировать контакт
          </p>
        </div>

        {/* Время работы */}
        <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-4">
          <p>🕐 Отвечаю в течение 15-30 минут</p>
          <p className="mt-1">Ежедневно с 9:00 до 22:00</p>
        </div>
      </div>
    </Modal>
  )
}

export default ContactModal
