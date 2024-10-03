import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import Button from './Button';
import { useDispatch } from 'react-redux';
import appSlice from '../redux/slices/appSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import authSlice from '@/redux/slices/authSlice';

// User Profile
const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="nav-item absolute right-1 top-24 bg-white shadow-lg p-8 rounded-lg w-96">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
                {/* Close Icon */}
                <Button
                    icon={<MdOutlineCancel />}
                    onClick={() => dispatch(appSlice.actions.handleClick('userProfile'))}
                />
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                {/* Avatar */}
                {/* <img className="rounded-full h-24 w-24" src={avatar} alt="user-profile" /> */}

                {/* User Info */}
                <div>
                    <p className="font-semibold text-xl dark:text-gray-200">Michael Roberts</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">info@shop.com</p>
                </div>
            </div>
            {/* User Profile Data */}
            <div>
                <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                    <button type="button" className=" text-xl rounded-lg p-3 hover:bg-light-gray">
                        hello
                    </button>

                    <div>
                        <p className="font-semibold dark:text-gray-200 ">My profile</p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">Account Settings</p>
                    </div>
                </div>
            </div>

            {/* Logout Icon */}
            <div className="mt-5">
                <Button
                    secondary
                    text="Đăng xuất"
                    className="w-full"
                    onClick={() => {
                        dispatch(authSlice.actions.signOut());
                        navigate('/sign-in');
                    }}
                />
            </div>
        </div>
    );
};

export default UserProfile;
