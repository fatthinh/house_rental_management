/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['Open Sans', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
        },
        extend: {
            colors: {
                'primary-100': '#f2f6ff',
                'primary-200': '#bfd7ff',
                'primary-300': '#8bbdfd',
                'primary-400': '#57a6f9',
                'primary-500': '#2494f0',
                'primary-600': '#0c78bd',
                'primary-700': '#035e8b',
                'primary-800': '#004059',
                'primary-900': '#001e26',

                /* Accent: Acapulco Sun */
                'accent-100': '#fffbf2',
                'accent-200': '#ffeac8',
                'accent-300': '#fcd39d',
                'accent-400': '#f6b470',
                'accent-500': '#eb8f44',
                'accent-600': '#ba5c20',
                'accent-700': '#883810',
                'accent-800': '#571e08',
                'accent-900': '#260b03',

                /* Neutral */
                'neutral-100': '#fafbfc',
                'neutral-200': '#e8ebef',
                'neutral-300': '#d8dce2',
                'neutral-400': '#c7ced4',
                'neutral-500': '#b7c0c7',
                'neutral-600': '#919a9f',
                'neutral-700': '#6c7377',
                'neutral-800': '#474c4e',
                'neutral-900': '#222526',

                /* Danger */
                'danger-100': '#FFF2F2',
                'danger-200': '#FEBCBC',
                'danger-300': '#FA838B',
                'danger-400': '#EE4A5F',
                'danger-500': '#D61539',
                'danger-600': '#AA072F',
                'danger-700': '#7E0227',
                'danger-800': '#52001E',
                'danger-900': '#260010',
            },
            fontSize: {
                14: '14px',
            },
            backgroundColor: {
                'main-bg': '#FAFBFB',
                'main-dark-bg': '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
            },
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            translate: {
                hide: '200%',
            },
            width: {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
                half: '50%',
            },
            keyframes: {
                'slide-left': {
                    '0%': {
                        transform: 'translate3d(0, 0, 0)',
                    },
                    '100%': {
                        transform: 'translate3d(-100%, 0, 0)',
                    },
                },
                'fly-out-down': {
                    '0%': {
                        transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    },
                    '20%': {
                        transform: 'translate3d(0, -10px, 0)',
                    },
                    '40%, 45%': {
                        opacity: '1',
                        transform: 'translate3d(0, 20px, 0)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translate3d(0, -2000px, 0)',
                    },
                },
            },
            animation: {
                slideleft: 'slide-left 1s ease-in-out 0.25s 1',
                flyoutdown: 'fly-out-down 0.6s ease-in-out 0.25s 1',
            },
        },
    },
    plugins: [],
};
