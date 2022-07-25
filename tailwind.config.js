/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				light: '#EEEEEE',
				dark: '#171010',
				darkSidebar: '#423F3E',
				lightSidebar: '#D8D2CB',
				btn: '#398AB9',
				btnHover: '#1C658C',
			},
		},
	},
	plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
};
