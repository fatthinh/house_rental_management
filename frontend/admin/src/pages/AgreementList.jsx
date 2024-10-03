import Header from '@/components/Header';
import Table from '@/components/Table';
import Paginator from '../components/Paginator';
import { useAxios } from './../hooks/useAxios';
import { endpoints } from '@/configs/API';
import Spinner from '@/components/Spinner';
import PageWrapper from '@/components/PageWrapper';

const fields = [
    {
        field: 'id',
        label: 'id',
    },
    {
        field: 'houseId',
        label: 'Tên phòng',
    },
    {
        field: 'startDate',
        label: 'Ngày bắt đầu',
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

const AgreementList = () => {
    const { response, error, loading } = useAxios({
        method: 'GET',
        url: endpoints.agreement,
    });

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Hợp đồng" path="/agreements/new" />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table data={response} fields={fields} toDetail="/agreements" />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default AgreementList;
