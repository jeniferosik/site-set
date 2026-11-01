/** @type {import("postcss-load-config").Config} */
const config = {
	plugins: {
		// No Tailwind v4, o plugin PostCSS está neste pacote separado.
		"@tailwindcss/postcss": {},
	},
};

export default config;
