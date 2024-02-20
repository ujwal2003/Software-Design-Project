/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/preline/preline.js'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
			modak: ['Modak', 'cursive']
		},

		extend: {
			colors: {
				background: '#F0F5F8',
				primary: '#f77373',
				secondary: '#f8be7c',
				accent: '#86abc1',
				logo: '#4a88c2',
				bgblack: '#282828',
				
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('preline/plugin')]
};
