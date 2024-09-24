import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import PageWrapper from '@/components/PageWrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import { useAxios } from '@/hooks/useAxios';
import { agreementFields } from '@/utils';

const AgreementForm = () => {
    const { response: availableHouse } = useAxios({
        url: `${endpoints.house}/state/available`,
        method: 'GET',
    });

    const navigate = useNavigate();
    const [selectHouseModal, setSelectHouseModal] = useState(false);
    const [state, setState] = useState({
        name: '',
        dob: '',
        citizenId: '',
        email: '',
        phone: '',
        genderString: '',
        hometown: '',
        deposit: '',
        startDate: '',
        house: '',
    });

    const onChangeState = (value, field) => {
        setState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSubmit = async () => {
        try {
            if (isValidForm()) {
                const houseId = availableHouse.find((item) => item.name == state.house).id;
                const res = await API.post(endpoints.agreement, {
                    ...state,
                    deposit: Number(state.deposit),
                    houseId: houseId,
                    gender: state.genderString === 'Nam' ? 0 : 1,
                });

                const houseRes = await API.put(`${endpoints.house}/${houseId}/reserved`);
                if (res.status == '200' && houseRes.status == '202') {
                    navigate(`agreement/${res.data}`);
                }
            }
        } catch (error) {}
    };

    const isValidForm = () => {
        const form = document.getElementsByClassName('agreement-form')[0];
        return form.checkValidity();
    };

    return (
        <>
            <PageWrapper>
                {/* Header */}
                <Header category="Tạo mới" title="Hợp đồng" />

                <hr />
                <Form
                    className="mt-6 agreement-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    {agreementFields.map((item) => (
                        <FormInput
                            key={item.field}
                            label={item.label}
                            type={item.type}
                            values={item.values}
                            value={state[item.field]}
                            setValue={(value) => onChangeState(value, item.field)}
                            onFocus={item.field == 'house' ? () => setSelectHouseModal(true) : () => {}}
                            readOnly={item.readOnly}
                        />
                    ))}

                    <div className="flex gap-4 justify-end">
                        <Button text="Hủy" />
                        <Button text="Tạo" className="px-6" primary loading type="submit" onClick={handleSubmit} />
                    </div>
                </Form>
            </PageWrapper>
            <Modal title="Chọn phòng" visible={selectHouseModal} setVisible={setSelectHouseModal}>
                <ul className="h-[240px] overflow-auto">
                    {availableHouse?.map((item) => (
                        <li className="hover:bg-primary-200" key={item.id}>
                            <button
                                className="text-start py-3 px-2 w-full"
                                onClick={() => {
                                    setSelectHouseModal(false);
                                    onChangeState(item.name, 'house');
                                }}
                            >
                                Phòng {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};
export default AgreementForm;
