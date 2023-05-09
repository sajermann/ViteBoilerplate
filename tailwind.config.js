/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				brand: {
					300: '#996DFF',
					500: '#8257e6',
				},
			},
			screens: {
				xm: '400px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1366px',
				'3xl': '1536px',
				'4xl': '1980px',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
