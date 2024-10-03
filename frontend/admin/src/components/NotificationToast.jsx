import { useEffect } from 'react';
import { appSelector } from '../redux/selectors';
import appSlice from '../redux/slices/appSlice';
import { BellIcon } from './Icons';
import { useDispatch, useSelector } from 'react-redux';

const NotificationToast = ({ message, time, title, visible }) => {
    const dispatch = useDispatch();
    const { toast } = useSelector(appSelector);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (toast.newNotification) dispatch(appSlice.actions.toggleToast({ toastName: 'newNotification' }));
        }, 5000);

        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <div
            className={`fixed ${
                visible ? 'bottom-8' : 'top-[-500px]'
            } right-8 w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow-xl`}
            role="alert"
        >
            <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold text-gray-900">Thông báo mới</span>
                <button
                    onClick={() => dispatch(appSlice.actions.toggleToast({ toastName: 'newNotification' }))}
                    className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex items-center">
                <div className="relative inline-block shrink-0">
                    <BellIcon />
                </div>
                <div className="ms-3 text-sm font-normal">
                    <div className="text-sm font-semibold text-gray-900">{title}</div>
                    <div className="text-sm font-normal">{message}</div>
                    <span className="text-xs font-medium text-blue-600">a few seconds ago</span>
                </div>
            </div>
        </div>
    );
};

export default NotificationToast;
