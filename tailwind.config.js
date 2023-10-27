/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.tsx', './src/**/*.ts', '.html'],
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
			keyframes: {
				overlayShow: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				overlayClose: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				contentShow: {
					from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
				},
				contentClose: {
					from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
					to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
				},
				enter: {
					'0%': { transform: 'scale(0.9)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				leave: {
					'0%': { transform: 'scale(1)', opacity: 1 },
					'100%': { transform: 'scale(0.9)', opacity: 0 },
				},
			},
			animation: {
				overlayShow: 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				overlayClose: 'overlayClose 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentClose: 'contentClose 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				enter: 'enter 200ms ease-out',
				leave: 'leave 150ms ease-in forwards',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
