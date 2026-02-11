/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: '#0E1621',
        surface: '#17212B',       // карточки / панели
        surfaceHover: '#1F2A36',  // hover для карточек
        mainText: '#E6E6E6',          // основной текст
        textMuted: '#8A96A3',     // вторичный текст
        textDim: '#5E6B78',       // мутный текст
        accent: '#2AABEE',        // основной акцент
        accentHover: '#229ED9',   // hover для акцента
        success: '#3FCF8E',
        warning: '#F5C16C',
        error: '#E5533D',       // основной фон приложения
        
      }
    }
  },
  darkMode: "class",
  plugins: [],
};
