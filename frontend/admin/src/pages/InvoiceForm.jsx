import PageWrapper from '@/components/PageWrapper';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import { useAxios } from '@/hooks/useAxios';
import API, { endpoints } from '@/configs/API';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';

const fields = [
    {
        label: 'Điện (số mới nhất)',
        name: 'electricity',
        categoryId: 1,
    },
    {
        label: 'Nước (số mới nhất)',
        name: 'water',
        categoryId: 2,
    },
    {
        label: 'Xe',
        name: 'parking',
        categoryId: 3,
    },
    {
        label: 'Dịch vụ',
        name: 'service',
        categoryId: 4,
    },
];

const InvoiceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        electricity: 0,
        water: 0,
        service: 1,
        parking: 1,
    });

    const handleSubmit = async () => {
        try {
            if (isValidForm()) {
                const data = [
                    {
                        categoryId: 5,
                        agreementId: id,
                        quantity: 1,
                    },
                    ...fields.map((item) => {
                        return {
                            categoryId: item.categoryId,
                            agreementId: id,
                            quantity: state[item.name],
                        };
                    }),
                ];

                const token = await cookie.load('token');
                const res = await API.post(`${endpoints.service}/createAll`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status == 200) {
                    navigate(`/invoices/${id}`);
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

    return (
        <PageWrapper>
            <Header category="Tạo mới" title="Hóa đơn" />
            <hr />
            <Form className="invoice-form" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2	gap-4 grid-rows-1">
                    {/* {serviceCategory &&
                        serviceCategory.slice(0, -1).map((item) => <FormInput key={item.id} label={item.name} />)} */}
                    {fields.map((item) => (
                        <FormInput
                            key={item.label}
                            label={item.label}
                            value={state[item.name]}
                            setValue={(value) =>
                                setState((prev) => {
                                    return {
                                        ...prev,
                                        [item.name]: value,
                                    };
                                })
                            }
                            type="number"
                        />
                    ))}

                    <div></div>
                    <div className="flex justify-end items-end gap-3">
                        <Button text="Tạo" primary type="submit" loading onClick={handleSubmit} />
                    </div>
                </div>
            </Form>
        </PageWrapper>
    );
};

export default InvoiceForm;
