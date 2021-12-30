module.exports = {
	content: [
		"./src/renderer/templates/*.html",
		"./src/renderer/javascript/*.js",
		"./src/preload/*.js"
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
		require('tailwind-scrollbar-hide')
	],
	daisyui: {
		base: false
	}
}
