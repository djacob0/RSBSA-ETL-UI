module.exports = {
    content: [
      "./src/renderer/**/*.{js,jsx,ts,tsx}",
      "./build/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            100: '#d1f7c4', // light green
            500: '#22c55e', // green (Tailwind's green-500)
            700: '#15803d', // darker green (Tailwind's green-700)
          },
          success: {
            500: '#10b981',
          },
          danger: {
            500: '#ef4444',
          },
          warning: {
            500: '#f59e0b',
          },
        },
      },
    },
    plugins: [],
  }