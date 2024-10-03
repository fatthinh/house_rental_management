import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import Modal from '@/components/Modal';
import { formatDate } from '@/utils/index';
import PageWrapper from '@/components/PageWrapper';
import { invoiceFields } from '@/utils';
import Spinner from '@/components/Spinner';

const serviceLabels = ['Điện(kí)', 'Nước(khối)', 'Xe(chiếc)', 'Dịch vụ'];

const InvoiceSingle = () => {
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    const { response, error, loading } = useAxios(
        {
            url: `${endpoints.invoice}/${id}`,
            method: 'GET',
        },
        refresh,
    );

    const [editable, setEditable] = useState(false);

    const [pendingState, setPendingState] = useState({
        electric: '',
        water: '',
    });

    const [serviceState, setServiceState] = useState([]);

    const onChangePendingState = (value, field) => {
        setPendingState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const onChangeServiceState = (id, value) => {
        setServiceState(serviceState.map((item) => (item.id === id ? { ...item, quantity: Number(value) } : item)));
    };

    const handleCompleteInvoice = async () => {
        try {
            if (isValidForm()) {
                const res = await API.post(`${endpoints.service}/createAll`, [
                    {
                        categoryId: 1,
                        quantity: pendingState.electric,
                        invoiceId: id,
                    },
                    {
                        categoryId: 2,
                        quantity: pendingState.water,
                        invoiceId: id,
                    },
                ]);

                if (res.status == '200') {
                    setRefresh((prev) => !prev);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isValidForm = () => {
        const form = document.getElementsByClassName('invoice-form')[0];
        return form.checkValidity();
    };

    useEffect(() => {
        if (response && response?.state != 'PENDING') {
            const services = response.services;

            console.log(services);
            setServiceState(
                services.map((item) => {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                    };
                }),
            );
        }
    }, [loading, refresh, response]);

    const handleSave = async () => {
        try {
            const res = await API.put(`${endpoints.service}/updateAll`, serviceState);
            if (res.status == '202') {
                setRefresh((prev) => !prev);
                setEditable(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PageWrapper>
            <Header category="Chi tiết" title="Hóa đơn" />
            <hr />
            {loading ? (
                <div className="flex justify-center">
                    <Spinner size={52} />
                </div>
            ) : response.state === 'PENDING' ? (
                <div>
                    <div className="flex p-2">
                        <h3 className="">Mã hóa đơn:</h3>
                        <span className="ml-2">{response.id}</span>
                    </div>
                    <p className="text-primary-600">
                        Chú ý: <span className="italic">Điền các thông tin để hoàn thành hóa đơn!</span>{' '}
                    </p>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="invoice-form"
                    >
                        <FormInput
                            type="number"
                            value={pendingState.electric}
                            setValue={(value) => onChangePendingState(value, 'electric')}
                            label="Điện (Số kí)"
                        />
                        <FormInput
                            type="number"
                            value={pendingState.water}
                            setValue={(value) => onChangePendingState(value, 'water')}
                            label="Nước (Số khối)"
                        />
                        <div className="flex gap-4 justify-end">
                            <Button text="Tiếp tục" primary loading type="submit" onClick={handleCompleteInvoice} />
                        </div>
                    </Form>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2	gap-4 grid-rows-1">
                        {invoiceFields.map((item) => (
                            <div key={item.field} className="flex p-2 gap-4">
                                <h3 className="text-sm">{item.label}:</h3>
                                <span className="text-md">
                                    {item.field === 'housePrice' || item.field === 'amount'
                                        ? response[item.field].toLocaleString()
                                        : response[item.field]}
                                </span>
                            </div>
                        ))}
                        <h3 className="font-bold underline">Các khoản phí:</h3>
                        <div></div>
                        {response.services.map((item, index) => (
                            <FormInput
                                type={editable ? 'number' : 'text'}
                                key={index}
                                readOnly={!editable}
                                label={
                                    editable
                                        ? serviceLabels[index]
                                        : `${serviceLabels[item.category.id - 1]} (${
                                              item.quantity
                                          } x ${item.category.price.toLocaleString()})`
                                }
                                value={
                                    editable
                                        ? serviceState[index].quantity
                                        : (item.quantity * item.category.price).toLocaleString()
                                }
                                setValue={(value) => onChangeServiceState(item.id, value)}
                            />
                        ))}
                        <div></div>
                        <div className="flex gap-4 justify-end items-end">
                            {editable ? (
                                <>
                                    <Button text="Hủy" onClick={() => setEditable(false)} outline />
                                    <Button text="Lưu" loading primary onClick={handleSave} />
                                </>
                            ) : (
                                <>
                                    <Button text="Xóa" className="bg-danger-500 text-white" />
                                    <Button text="In hóa đơn" secondary />
                                    <Button text="Chỉnh sửa" primary onClick={() => setEditable(true)} />
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </PageWrapper>
    );
};
export default InvoiceSingle;
