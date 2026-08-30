import React, { useState } from 'react'
import Modal from './Modal'
import {
  TelegramIcon,
  WhatsAppIcon,
  // VKIcon,
  // MAXIcon,
} from '@/components/ui/SocialIcons'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const contactInfo = {
    name: 'Басалаев Иван',
    phone: '+7 (999) 123-45-67',
    phoneRaw: '+79991234567',
    email: 'ivan@tutor.ru',
    telegram: '@ivan_tutor',
    whatsapp: '+7 (999) 123-45-67',
    vk: 'https://vk.com/ivan_tutor',
    max: 'https://max.ru/ivan_tutor',
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }).catch(() => {
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
    <Modal isOpen={isOpen} onClose={onClose} title="Свяжитесь с Иваном" size="md">
      <div className="space-y-5">
        {/* Имя репетитора */}
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a2a4a]">{contactInfo.name}</p>
          <p className="text-gray-500 text-sm">Репетитор по химии и математике</p>
        </div>

        {/* Телефон */}
        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a2a4a]/10 flex items-center justify-center text-[#1a2a4a] text-lg">
                📞
              </div>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button
                onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                className="relative p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                title="Скопировать номер"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copiedField === 'phone' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a2a4a]/10 flex items-center justify-center text-[#1a2a4a] text-lg">
                ✉️
              </div>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => copyToClipboard(contactInfo.email, 'email')}
                className="relative p-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                title="Скопировать email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copiedField === 'email' && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Мессенджеры и соцсети */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={contactInfo.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-xl transition-colors font-medium"
          >
            <TelegramIcon className="w-5 h-5" />
            Telegram
          </a>
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-3 bg-[#25d366] hover:bg-[#1da851] text-white rounded-xl transition-colors font-medium"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={contactInfo.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-3 bg-[#4a76a8] hover:bg-[#3a5f8a] text-white rounded-xl transition-colors font-medium"
          >
            {/* <VKIcon className="w-5 h-5" /> */}
            VK
          </a>
          <a
            href={contactInfo.max}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-3 bg-[#1a2a4a] hover:bg-[#0f172a] text-white rounded-xl transition-colors font-medium"
          >
            {/* <MAXIcon className="w-5 h-5" /> */}
            MAX
          </a>
        </div>

        {/* Подсказка
        <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-600">
            Нажмите на иконку <span className="font-semibold text-[#f59e0b]">копирования</span>, чтобы скопировать контакт
          </p>
        </div> */}

        {/* Время работы */}
        <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-4">
          <p>Отвечаю в течение 15-30 минут</p>
          <p className="mt-1">Ежедневно с 9:00 до 22:00</p>
        </div>
      </div>
    </Modal>
  )
}

export default ContactModal
