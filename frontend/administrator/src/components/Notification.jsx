import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Button from './Button';
import { useDispatch } from 'react-redux';
import appSlice from '@/redux/slices/appSlice';

const chatData = [
    {
        message: 'Thanh toán',
        desc: 'Phòng C204 đã thanh toán hóa đơn tháng 10',
        time: '9:08 AM',
    },
    {
        message: 'Cảnh báo',
        desc: 'Phát hiện người lạ',
        time: '11:56 AM',
    },
    {
        message: 'Thanh toán',
        desc: 'Phòng C106 đã thanh toán hóa đơn tháng 10',
        time: '12:08 AM',
    },
    {
        message: 'Thanh toán',
        desc: 'Phòng C105 đã thanh toán hóa đơn tháng 10',
        time: '9:52 AM',
    },
];

const Notification = () => {
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
                            {chatData.length} mới
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
                    {chatData?.map((item, index) => (
                        <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
                            <div className="w-full">
                                <p className="font-semibold">{item.message}</p>
                                <p className="text-gray-500 text-sm"> {item.desc} </p>
                                <p className="text-end text-gray-500 text-xs">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
