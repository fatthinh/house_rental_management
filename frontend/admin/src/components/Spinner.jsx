export const Spinner = ({ size = 32 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="-2.8 -2.8 19.60 19.60"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="animate-spin"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.05600000000000001"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <g fill="none" fillRule="evenodd">
                    <circle cx="7" cy="7" r="6" stroke="#000000" strokeOpacity=".1" strokeWidth="1.4"></circle>
                    <path
                        fill="#000000"
                        fillOpacity=".1"
                        fillRule="nonzero"
                        d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"
                    ></path>
                </g>
            </g>
        </svg>
    );
};

export default Spinner;
