/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: ["./src/**/*.{html,js,ts, tsx, jsx}"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html,css}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {},
        fontFamily: {
            'roboto': ['Roboto', 'sans-serif'],
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

