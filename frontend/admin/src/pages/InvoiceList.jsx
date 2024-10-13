import Header from '@/components/Header';
import Table from '@/components/Table';
import PageWrapper from '@/components/PageWrapper';
import Spinner from '@/components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { endpoints } from '@/configs/API';
import { useAxios } from '@/hooks/useAxios';
import dataSlice from '@/redux/slices/dataSlice';

export const fields = [
    {
        field: 'id',
        label: 'Mã',
    },
    {
        field: 'houseName',
        label: 'Phòng',
    },
    {
        field: 'month',
        label: 'Tháng',
    },
    {
        field: 'year',
        label: 'Năm',
    },
    {
        field: 'link',
        label: '',
    },
];

const InvoiceList = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear().toFixed());
    const dispatch = useDispatch();

    const [refresh, setRefresh] = useState(false);
    const { response, loading } = useAxios(
        {
            method: 'GET',
            url: `${endpoints.agreement}?month=${month}`,
        },
        refresh,
    );

    useEffect(() => {
        dispatch(dataSlice.actions.setCurrentMonth(month));
    }, [month]);

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Hóa đơn" />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table
                        data={Array.from(response)
                            .map((item) => {
                                return { ...item, month: month, year: year };
                            })
                            .sort((a, b) => a.houseName.localeCompare(b.houseName))}
                        fields={fields}
                        toDetail="/invoices"
                        dropdownItems={[10, 9, 8, 7, 6, 5]}
                        onClickDropdownItem={(item) => {
                            setMonth(item);
                            setRefresh((prev) => !prev);
                        }}
                        dropdownLabel="Tháng"
                    />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default InvoiceList;
