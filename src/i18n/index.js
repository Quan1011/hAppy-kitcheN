import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import deTranslation from './locales/de.json'
import enTranslation from './locales/en.json'

const resources = {
  de: { translation: deTranslation },
  en: { translation: enTranslation },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

export default i18n

