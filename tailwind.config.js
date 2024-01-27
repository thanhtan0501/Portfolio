/** @type {import('tailwindcss').Config} */

// Set up typography scales
const fontSize = {}
const spacing = {}
const minHeight = {}
const avatarIndex = 9

spacing.avatar = `var(--step-${avatarIndex})`

for (let i = -2; i < 10; i++) {
  fontSize[`fluid-${i}`] = `var(--step-${i})`
}
minHeight['half-avatar'] = `calc(var(--step-${avatarIndex}) * 0.5)`
module.exports = {
  content: ['./src/**/*.{,html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      spacing,
      minHeight,
      fontSize,
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brandstroke: 'hsl(var(--brand-stroke))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'text-0': 'var(--gray-0)',
        'text-1': 'var(--gray-1)',
        'text-2': 'var(--gray-3)',
        'text-3': 'var(--gray-5)',
        'text-4': 'var(--gray-6)',
        'text-5': 'var(--gray-9 )',
        'surface-0': 'var(--gray-10)',
        'surface-1': 'var(--gray-9)',
        'surface-2': 'var(--gray-8)',
        'surface-3': 'var(--gray-7)',
        'surface-4': 'var(--gray-6)',
        'surface-5': 'var(--gray-5)',
        'surface-alpha': 'hsl(var(--gray-10-hsl) / 65%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
