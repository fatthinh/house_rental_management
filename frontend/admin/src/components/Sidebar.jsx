import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '@/redux/selectors';
import appSlice from './../redux/slices/appSlice';

// Icons Import
import { MdOutlineCancel } from 'react-icons/md';
import { privateRoutes } from '../routes';
import { useWindowSize } from '@/hooks/useWindowSize';

const Sidebar = () => {
    const { activeMenu, currentColor } = useSelector(appSelector);
    const dispatch = useDispatch();

    const { screenWidth } = useWindowSize();

    // handle sidebar close
    const handleCloseSidebar = () => {
        if (activeMenu && screenWidth <= 900) {
            dispatch(appSlice.actions.hideMenu());
        }
    };

    // change menu style if screen size is changed
    useEffect(() => {
        if (screenWidth <= 900) {
            dispatch(appSlice.actions.hideMenu());
        } else {
            dispatch(appSlice.actions.showMenu());
        }
    }, [screenWidth]);

    // active link styles
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';

    // non-active link styles
    const normalLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        {/* Brand Info */}
                        <Link
                            to="/"
                            onClick={handleCloseSidebar}
                            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-primary-600"
                        >
                            seventee
                        </Link>

                        {/* Menu Close Icon */}
                        {/* Add tooltip */}
                        <button
                            type="button"
                            onClick={() => dispatch(appSlice.actions.toggleMenu())}
                            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                        >
                            <MdOutlineCancel />
                        </button>
                    </div>

                    {/* Render all Links */}
                    <div className="mt-10">
                        {privateRoutes.map(
                            (item) =>
                                item.display !== 'none' && (
                                    <div key={item.name}>
                                        {/* each link from every category */}
                                        <NavLink
                                            to={item.path}
                                            onClick={handleCloseSidebar}
                                            style={({ isActive }) => ({
                                                backgroundColor: isActive ? currentColor : '',
                                            })}
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                        >
                                            <item.icon />
                                            <span className="font-medium">{item.name}</span>
                                        </NavLink>
                                    </div>
                                ),
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
