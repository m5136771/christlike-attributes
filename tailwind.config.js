/** @type {import('tailwindcss').Config} */

/* 
---Color Palette---
Primary Color - Serene Blue: Hex: #4A90E2
Represents: tranquility, trust, and spiritual depth.

Secondary Color - Soft Lavender: Hex: #B18FCF
Symbolizes: wisdom, dignity, and peacefulness.

Accent Color - Gentle Gold: Hex: #F5A623
Conveys: enlightenment, warmth, and optimism.

Neutral - Light Gray: Hex: #F4F4F4
Use for: backgrounds and UI elements, providing a calming backdrop.

Text - Dark Charcoal: Hex: #333333
For readability and a grounded, serious tone.

---Typography---
Primary Font (Headings and Emphasis): 'Lato'
Style: Modern, friendly, and clear.
Usage: Great for titles and key UI elements to grab attention.

Secondary Font (Body and Content): 'Merriweather'
Style: Highly readable, slightly traditional but with a modern touch.
Usage: Ideal for longer texts like scripture references, journal entries, and descriptions. */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4A90E2',
        'serene-blue': '#4A90E2',
        'secondary': '#B18FCF',
        'soft-lavender': '#B18FCF',
        'accent': '#F5A623',
        'gentle-gold': '#F5A623',
        'neutral': '#F4F4F4',
        'light-gray': '#F4F4F4',
        'text': '#333333',
        'dark-charcoal': '#333333',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}