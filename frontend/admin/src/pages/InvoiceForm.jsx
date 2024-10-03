import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState } from 'react';

const InvoiceForm = () => {
    const [state, setState] = useState({
        amount: '',
        month: '',
        agreement: '',
    });
    return (
        <div className="m-2 mt-6 md:m-10 md:mt-2 p-2 md:p-10 bg-white rounded-3xl">
            {/* Header */}
            <Header category="Tạo mới" title="Phòng" />

            <hr />
            <Form className="mt-6">
                <FormInput
                    value={state.amount}
                    setValue={(value) => onChangeState(value, 'amount')}
                    name="amount"
                    label="Số tiền"
                />
                <FormInput
                    value={state.month}
                    setValue={(value) => onChangeState(value, 'month')}
                    name="month"
                    label="Tháng"
                />
                <FormInput
                    value={state.agreement}
                    setValue={(value) => onChangeState(value, 'agreement')}
                    name="agreement"
                    label="Hợp đồng"
                />
                <div className="flex gap-4 justify-end">
                    <Button text="Hủy" className="bg-neutral-200 px-6 font-medium" borderRadius={6} />
                    <Button
                        text="Tạo mới"
                        className="bg-primary-300 px-6 font-medium"
                        borderRadius={6}
                        color="white"
                        type="submit"
                    />
                </div>
            </Form>
        </div>
    );
};
export default InvoiceForm;
