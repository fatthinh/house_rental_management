import Header from '@/components/Header';
import Table from '@/components/Table';
import PageWrapper from '@/components/PageWrapper';
import Spinner from '@/components/Spinner';
import { endpoints } from '@/configs/API';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';

export const fields = [
    {
        field: 'id',
        label: 'Id',
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
        field: 'state',
        label: 'Trạng thái',
    },
    {
        field: 'link',
        label: '',
    },
];

const InvoiceList = () => {
    const { response, error, loading } = useAxios({
        method: 'GET',
        url: endpoints.invoice,
    });

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Cư dân" />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table data={response} fields={fields} toDetail="/invoices" />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default InvoiceList;
