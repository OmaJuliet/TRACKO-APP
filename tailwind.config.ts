import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sms: {
          min: "411px",
          max: "415px",
        },
        mss: {
          min: "530px",
          max: "542px",
        },
        sxl: {
          min: "1022px",
          max: "1025px",
        },
        xsl: {
          min: "1270px",
          max: "1281px",
        },
      },
    },
  },
  plugins: [],
}
export default config
