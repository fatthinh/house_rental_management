import Tippy from '@tippyjs/react';

// Navbar Button
const NavButton = ({ title, onClick, icon, color, dotColor }) => (
    <Tippy content={title} offset={[12, 6]}>
        {/* Render button for navbar */}
        <button
            type="button"
            onClick={onClick}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </Tippy>
);

export default NavButton;
