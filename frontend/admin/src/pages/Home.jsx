// Icons Import
import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';

//import
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
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
import { useSelector } from 'react-redux';
import { dataSelector } from '../redux/selectors';
import { useAxios } from '@/hooks/useAxios';

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

const labels = Array.from({ length: 6 }, (v, i) => `Tháng ${i + 5}`);

// export const data = {
//     labels,
//     datasets: [
//         {
//             type: 'bar',
//             label: 'Doanh thu năm 2024 (VNĐ)',
//             backgroundColor: 'rgb(75, 192, 192)',
//             data: labels.map(() => Math.floor(Math.random() * 100000000)),
//             borderColor: 'white',
//             borderWidth: 2,
//         },
//     ],
// };

export const earningData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        amount: '248',
        title: 'Cư dân',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
        name: 'tenant',
    },
    {
        icon: <BsBoxSeam />,
        amount: '53',
        title: 'Phòng',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
        name: 'house',
    },
    {
        icon: <HiOutlineRefresh />,
        amount: '48',
        title: 'Hợp đồng',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
        name: 'agreement',
    },
    {
        icon: <FiBarChart />,
        amount: '103,034,000',
        title: `Tổng doanh thu`,
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
        pcColor: 'green-600',
        name: 'revenue',
    },
];

const Home = () => {
    const payload = useSelector(dataSelector);

    const { response: invoices } = useAxios({
        method: 'GET',
        url: `/payment/invoice?state=paid`,
    });

    const groupedByMonth = invoices?.reduce((acc, curr) => {
        const date = new Date(curr.createdAt);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!acc[yearMonth]) {
            acc[yearMonth] = { totalAmount: 0, items: [] };
        }

        acc[yearMonth].totalAmount += curr.amount;
        acc[yearMonth].items.push(curr);

        return acc;
    }, {});

    // Data for the bar chart
    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Doanh thu năm 2024 (VNĐ)',
                backgroundColor: 'rgb(75, 192, 192)',
                data: labels.map((label, index) => {
                    const monthIndex = index + 5 > 12 ? index + 5 - 12 : index + 5;
                    const key = `2024-${String(monthIndex).padStart(2, '0')}`;
                    return groupedByMonth?.[key]?.totalAmount || 0;
                }),
                borderColor: 'white',
                borderWidth: 2,
            },
        ],
    };

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
                            <span className="px-4 items-end text-lg font-semibold">
                                {item.name == 'revenue'
                                    ? `${invoices
                                          ?.reduce((accumulator, item) => accumulator + item?.amount, 0)
                                          .toLocaleString()}đ`
                                    : payload[item.name]?.data?.length}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-12 mx-auto max-w-[70%]">
                <div className="flex justify-end">
                    <Dropdown dropdownItems={[2024, 2023]} label="Năm" />
                </div>
                <Chart type="bar" data={data} />
            </div>
        </div>
    );
};
export default Home;
