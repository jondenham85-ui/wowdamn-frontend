/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
          './app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
    theme: {
          extend: {
                  colors: {
                            gold: '#FFD700',
                            'gold-dark': '#B8860B',
                            midnight: '#0a0a0f',
                            'midnight-light': '#12121a',
                  },
                  animation: {
                            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            'spin-slow': 'spin 8s linear infinite',
                  },
          },
    },
    plugins: [],
}
