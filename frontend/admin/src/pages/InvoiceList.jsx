import Header from '@/components/Header';
import Table from '@/components/Table';
import PageWrapper from '@/components/PageWrapper';
import Spinner from '@/components/Spinner';
import { useSelector } from 'react-redux';
import { dataSelector } from './../redux/selectors';

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
        field: 'state',
        label: 'Trạng thái',
    },
    {
        field: 'link',
        label: '',
    },
];

const InvoiceList = () => {
    const { invoice: payload } = useSelector(dataSelector);

    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Danh sách" title="Hóa đơn" />
            {payload.loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : (
                <>
                    <Table data={payload.data} fields={fields} toDetail="/invoices" />
                    {/* <Paginator /> */}
                </>
            )}
        </PageWrapper>
    );
};
export default InvoiceList;
