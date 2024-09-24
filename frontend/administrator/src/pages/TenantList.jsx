import Header from '@/components/Header';
import Table from '@/components/Table';
import { useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import Spinner from '@/components/Spinner';
import Paginator from '../components/Paginator';
import PageWrapper from '@/components/PageWrapper';

const fields = [
    {
        field: 'id',
        label: 'id',
    },
    {
        field: 'name',
        label: 'Họ và tên',
    },
    {
        field: 'phone',
        label: 'Số điện thoại',
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

const TenantList = () => {
    const { response, error, loading } = useAxios({
        method: 'GET',
        url: 'rental/tenant',
    });

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Cư dân" path="/tenants/new" />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table data={response} fields={fields} toDetail="/tenants" />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};

export default TenantList;
