/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				blink: 'blink 1s ease-in-out infinite',
			},
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '0' },
					'25%': { opacity: '1' },
					'75%': { opacity: '1' },
				},
			},
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '3.75rem',
			'7xl': '4.5rem',
			'8xl': '6rem',
			'9xl': '8rem',
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
		},
	},
	plugins: [require('tailwind-scrollbar')],
	variants: {
		before: ['responsive'],
		after: ['responsive'],
		scrollbar: ['dark'],
	},
};
