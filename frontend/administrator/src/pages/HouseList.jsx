import Header from '@/components/Header';
import Table from '@/components/Table';
import { useAxios } from '@/hooks/useAxios';
import { endpoints } from '@/configs/API';
import Spinner from '@/components/Spinner';
import PageWrapper from '@/components/PageWrapper';

const data = [
    {
        id: '23489712471',
        name: 'C02',
        price: 2100000,
        status: 'active',
    },
];

const fields = [
    {
        field: 'id',
        label: 'id',
    },
    {
        field: 'name',
        label: 'Tên',
    },
    {
        field: 'price',
        label: 'Giá tiền',
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

const HouseList = () => {
    const { response, error, loading } = useAxios({
        url: endpoints.house,
        method: 'GET',
    });

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Phòng" />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table data={response} fields={fields} toDetail="/houses" />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default HouseList;
