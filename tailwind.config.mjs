/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
	darkMode: ["class"],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["IBM Plex Mono", ...defaultTheme.fontFamily.sans],
				serif: ["IBM Plex Serif", ...defaultTheme.fontFamily.serif],
			  },
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}