module.exports = {
	content: [
		"./src/renderer/templates/*.html",
		"./src/renderer/javascript/*.js",
		"./src/preload/*.js"
	],
	theme: {
		extend: {
			strokeWidth: {
				'5': '5px',
			}
		},
	},
	plugins: [
		require('daisyui'),
		require('tailwind-scrollbar-hide'),
		function({ addUtilities }) {
			const newUtilities = {
				'.drag': {
					'-webkit-app-region': 'drag'
				},
				'.no-drag': {
					'-webkit-app-region': 'no-drag'
				}
			}
			addUtilities(newUtilities);
		}
	],
	daisyui: {
		base: false
	}
}
