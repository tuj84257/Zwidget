module.exports = {
	content: [
		"./src/*/frontend/template.html",
		"./src/*/frontend/javascript/*.js",
		"./src/*/preload/*.js"
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
		function({ addUtilities, addBase }) {
			const newUtilities = {
				'.drag': {
					'-webkit-app-region': 'drag'
				},
				'.no-drag': {
					'-webkit-app-region': 'no-drag'
				}
			}
			const newBase = {
				'.bg-base': {
					'background-color': '#3D4451'
				}
			}
			addUtilities(newUtilities);
			addBase(newBase);
		}
	],
	daisyui: {
		base: false
	}
}
