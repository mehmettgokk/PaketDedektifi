export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  future: {
    compatibilityVersion: 4,
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],
  runtimeConfig: {
    aftershipApiKey: (typeof process !== 'undefined' && process.env?.NUXT_AFTERSHIP_API_KEY) || '',
    public: {
      appName: 'Paket Dedektifi',
    },
  },
  app: {
    head: {
      title: 'Paket Dedektifi - Akıllı Kargo Takip Sistemi',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Farklı kargo firmalarından gelen verileri tek ekranda toplayan kargo takip uygulaması.' },
      ],
    },
  },
});