// Icons Import
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';

//import
import React, { useState } from 'react';
import Dropdown from '../components/DropDown';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
);

const labels = Array.from({ length: 12 }, (v, i) => `Tháng ${i + 1}`);

export const data = {
    labels,
    datasets: [
        {
            type: 'bar',
            label: 'Doanh thu năm 2024 (VNĐ)',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => Math.floor(Math.random() * 100000000)),
            borderColor: 'white',
            borderWidth: 2,
        },
    ],
};

export const earningData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        amount: '248',
        title: 'Cư dân',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
    },
    {
        icon: <BsBoxSeam />,
        amount: '53',
        title: 'Phòng',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
    },
    {
        icon: <HiOutlineRefresh />,
        amount: '48',
        title: 'Hợp đồng',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
    },
    {
        icon: <FiBarChart />,
        amount: '103,034,000',
        title: 'Doanh thu tháng 10',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',

        pcColor: 'green-600',
    },
];

const Home = () => {
    return (
        <div className="mt-2 max-w-full">
            <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                    {/* Earning Data */}
                    {earningData.map((item) => (
                        <div key={item.title} className="bg-white h-44 md:w-56  p-4 pt-9 rounded-2xl ">
                            <button
                                type="button"
                                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl w-full flex justify-between mb-2"
                            >
                                {item.icon}
                                <span className="text-sm text-gray-400">{item.title}</span>
                            </button>
                            <span className="px-4 items-end text-lg font-semibold">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-12 mx-auto max-w-[70%]">
                <div className="flex justify-end">
                    <Dropdown />
                </div>
                <Chart type="bar" data={data} />
            </div>
        </div>
    );
};
export default Home;
