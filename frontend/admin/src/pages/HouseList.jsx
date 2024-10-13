import Header from '@/components/Header';
import Table from '@/components/Table';
import { useAxios } from '@/hooks/useAxios';
import { endpoints } from '@/configs/API';
import Spinner from '@/components/Spinner';
import PageWrapper from '@/components/PageWrapper';
import { useSelector } from 'react-redux';
import { dataSelector } from './../redux/selectors';

const fields = [
    {
        field: 'id',
        label: 'Mã',
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
    const { house: payload } = useSelector(dataSelector);

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Phòng" />
            {payload.loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table
                        data={Array.from(payload.data).sort((a, b) => a.name.localeCompare(b.name))}
                        fields={fields}
                        toDetail="/houses"
                    />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default HouseList;
