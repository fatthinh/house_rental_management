import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import { useAxios } from '@/hooks/useAxios';
import Modal from '@/components/Modal';
import { tenantFields } from '@/utils';
import PageWrapper from '@/components/PageWrapper';
import cookie from 'react-cookies';

const TenantForm = () => {
    const { response: reservedHouses } = useAxios({
        url: `${endpoints.house}/state/reserved`,
        method: 'GET',
    });

    const [housesModalVis, setHousesModalVis] = useState(false);

    const navigate = useNavigate();
    const [state, setState] = useState({
        name: '',
        dob: '',
        citizenId: '',
        phone: '',
        email: '',
        genderString: '',
        hometown: '',
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
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const gender = state.genderString === 'Nam' ? 0 : 1;
            const submissionData = {
                ...state,
                gender, // Add the computed gender property
                houseId: reservedHouses.find((item) => item.name == state.house).id,
            };

            const token = cookie.load('token');
            const response = await API.post(endpoints.tenant, submissionData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate(`/tenants/${response.data}`);
        } catch (error) {
            console.log(error);
        } finally {
            setState({
                name: '',
                dob: '',
                citizen_id: '',
                phone: '',
                genderString: '',
                hometown: '',
            });
        }
    };

    return (
        <>
            <PageWrapper>
                {/* Header */}
                <Header category="Tạo mới" title="Cư dân" />

                <hr />
                <Form className="mt-6" onSubmit={onSubmit}>
                    {tenantFields.map((item) => (
                        <FormInput
                            key={item.field}
                            label={item.label}
                            type={item.type}
                            values={item.values}
                            value={state[item.field]}
                            setValue={(value) => onChangeState(value, item.field)}
                            readOnly={item.readOnly}
                            onFocus={item.field == 'house' ? () => setHousesModalVis(true) : () => {}}
                        />
                    ))}
                    <div className="flex gap-4 justify-end">
                        <Button text="Hủy" onClick={() => navigate('/tenants')} outline />
                        <Button text="Tạo mới" type="submit" primary loading />
                    </div>
                </Form>
            </PageWrapper>
            <Modal title="Chọn phòng" visible={housesModalVis} setVisible={setHousesModalVis}>
                <ul className="h-[240px] overflow-auto">
                    {reservedHouses?.map((item) => (
                        <li className="hover:bg-primary-200" key={item.id}>
                            <button
                                className="text-start py-3 px-2 w-full"
                                onClick={() => {
                                    setHousesModalVis(false);
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
export default TenantForm;
