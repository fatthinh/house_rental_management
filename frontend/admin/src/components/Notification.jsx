import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Button from './Button';
import { useDispatch } from 'react-redux';
import appSlice from '@/redux/slices/appSlice';
import { useAxios } from '@/hooks/useAxios';
import { formatDate } from '@/utils/index';

const Notification = () => {
    const { response: invoices } = useAxios({
        method: 'GET',
        url: `/notification`,
    });

    const dispatch = useDispatch();
    return (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
            <div className="float-right h-screen duration-1000 ease-in-out transition-all bg-white md:w-400 p-8">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        {/* Title */}
                        <p className="font-semibold text-lg dark:text-gray-200">Thông báo</p>
                        {/* New Notifications */}
                        <h4 className="text-xs leading-5 text-white rounded p-1 px-2 bg-accent-400 ">
                            {invoices?.length} mới
                        </h4>
                    </div>

                    {/* Close Icon */}
                    <Button
                        icon={<MdOutlineCancel />}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="2xl"
                        borderRadius="50%"
                        onClick={() => dispatch(appSlice.actions.handleClick('notification'))}
                    />
                </div>

                <div className="mt-5 overflow-auto max-h-screen">
                    {invoices?.map((item, index) => (
                        <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
                            <div className="w-full">
                                <p className="font-semibold">{item.subject}</p>
                                <p className="text-gray-500 text-sm"> {item.body} </p>
                                <p className="text-end text-gray-500 text-xs">{formatDate(item.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
