import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes https://starlight.astro.build/guides/css-and-tailwind/#color-theme-editor
const accent = { 200: '#95d0ff', 600: '#0072af', 900: '#003556', 950: '#00263f' };
const gray = { 100: '#f5f6f8', 200: '#eceef2', 300: '#c0c2c7', 400: '#888b96', 500: '#545861', 700: '#353841', 800: '#24272f', 900: '#17181c' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};
