import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';

const HouseForm = () => {
    const [state, setState] = useState({
        name: '',
        floor: '',
        description: '',
        size: '',
        price: '',
    });
    return (
        <PageWrapper>
            {/* Header */}
            <Header category="Tạo mới" title="Phòng" />

            <hr />
            <Form className="mt-6">
                <FormInput
                    value={state.name}
                    setValue={(value) => onChangeState(value, 'name')}
                    name="name"
                    label="Tên phòng"
                />
                <FormInput
                    value={state.floor}
                    setValue={(value) => onChangeState(value, 'floor')}
                    name="floor"
                    label="Tầng"
                    type="number"
                />
                <FormInput
                    value={state.price}
                    setValue={(value) => onChangeState(value, 'price')}
                    name="price"
                    label="Giá"
                />
                <FormInput
                    value={state.size}
                    setValue={(value) => onChangeState(value, 'size')}
                    name="size"
                    label="Kích thước"
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
        </PageWrapper>
    );
};
export default HouseForm;
