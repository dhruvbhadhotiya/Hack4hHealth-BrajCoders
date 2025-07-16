/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        medical: {
          red: '#FF3B30',
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          purple: '#AF52DE',
          pink: '#FF2D92',
          yellow: '#FFCC00',
          teal: '#5AC8FA',
        },
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#8E8E93',
          'light-gray': '#F2F2F7',
          'dark-gray': '#1C1C1E',
        }
      },
      boxShadow: {
        'brutal': '8px 8px 0px #000000',
        'brutal-sm': '4px 4px 0px #000000',
        'brutal-lg': '12px 12px 0px #000000',
      },
      animation: {
        'medical-pulse': 'medicalPulse 2s infinite',
        'heartbeat': 'heartbeat 1.5s infinite',
        'data-stream': 'dataStream 3s infinite linear',
        'glitch': 'glitch 0.3s infinite',
        'ecg': 'ecg 3s infinite linear',
        'vital-sign': 'vitalSign 2s infinite ease-in-out',
        'status-pulse': 'statusPulse 2s infinite',
      },
      textColor: {
        'auto': 'inherit',
      }
    },
  },
  plugins: [],
};