import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Only initialize in browser environment
if (typeof window !== 'undefined') {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: 'de', // default language
      fallbackLng: 'de',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
    });
} else {
  // Server-side: Initialize without backend
  i18n
    .use(initReactI18next)
    .init({
      lng: 'de',
      fallbackLng: 'de',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources: {}, // Empty resources for server-side
    });
}

export default i18n;
