import Header from '@/components/Header';
import Table from '@/components/Table';
import Spinner from '@/components/Spinner';
import PageWrapper from '@/components/PageWrapper';
import { useSelector } from 'react-redux';
import { dataSelector } from '../redux/selectors';

const fields = [
    {
        field: 'id',
        label: 'Mã',
    },
    {
        field: 'houseName',
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
    const { agreement: payload } = useSelector(dataSelector);

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Hợp đồng" path="/agreements/new" />
            {payload.loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table
                        data={Array.from(payload.data).sort((a, b) => a.houseName.localeCompare(b.houseName))}
                        fields={fields}
                        toDetail="/agreements"
                    />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default AgreementList;
