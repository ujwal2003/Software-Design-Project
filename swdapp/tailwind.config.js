/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/preline/preline.js'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('preline/plugin')]
};
