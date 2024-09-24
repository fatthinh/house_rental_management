import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

// import { Cart, Chat, Notification, UserProfile } from '.';
import { useDispatch, useSelector } from 'react-redux';
import appSlice from '../redux/slices/appSlice';
import NavButton from './NavButton';
import { appSelector } from './../redux/selectors';
import Tippy from '@tippyjs/react';

const Navbar = () => {
    const { currentColor } = useSelector(appSelector);
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            {/* Menu */}
            <NavButton
                title="Menu"
                onClick={() => dispatch(appSlice.actions.toggleMenu())}
                color={currentColor}
                icon={<AiOutlineMenu />}
            />

            <div className="flex">
                {/* Chat */}
                <NavButton
                    title="Chat"
                    onClick={() => handleClick('chat')}
                    dotColor="#03C9D7"
                    color={currentColor}
                    icon={<BsChatLeft />}
                />

                {/* Notifications */}
                <NavButton
                    title="Notifications"
                    onClick={() => handleClick('notification')}
                    dotColor="#fec90f"
                    color={currentColor}
                    icon={<RiNotification3Line />}
                />

                {/* Profile */}
                <Tippy content="Profile">
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        {/* Avatar */}
                        <img
                            src="https://res.cloudinary.com/dzjhqjxqj/image/upload/v1704532184/default-avatar-icon-of-social-media-user-vector_yefjz5.jpg"
                            className="rounded-full w-8 h-8"
                            alt="Avatar"
                        />
                        <p>
                            <span className="text-gray-400 text-14">Hi, </span> {/* User name */}
                            <span className="text-gray-400 font-bold ml-1 text-14">Michael</span>
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                </Tippy>

                {/* Render component when it is clicked */}
                {/* {isClicked.cart && <Cart />}
                {isClicked.chat && <Chat />}
                {isClicked.notification && <Notification />}
                {isClicked.userProfile && <UserProfile />} */}
            </div>
        </div>
    );
};

export default Navbar;
