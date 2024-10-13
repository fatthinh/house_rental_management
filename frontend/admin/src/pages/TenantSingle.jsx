import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useNavigate } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import Modal from '@/components/Modal';
import { tenantFields } from '@/utils';
import PageWrapper from '@/components/PageWrapper';
import cookie from 'react-cookies';

const TenantSingle = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { response, error, loading } = useAxios({
        url: `${endpoints.tenant}/${id}`,
        method: "GET"
    });

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const [editable, setEditable] = useState(false);
    const [state, setState] = useState({
        name: '',
        dob: '',
        citizenId: '',
        phone: '',
        genderString: '',
        hometown: '',
        house: '',
        email: "name@gmail.com"
    });

    const onChangeState = (value, field) => {
        setState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    useEffect(() => {
        const fetchHouseData = async () => {
            if (response) {
                try {
                    const token = await cookie.load("token")
                    const houseRes = await API.get(`${endpoints.house}/${response.houseId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setState({ ...response, house: houseRes.data.name });
                } catch (error) {
                    console.error('Error fetching house data:', error);
                }
            }
        };

        fetchHouseData();
    }, [loading, editable]);

    const handleRemove = async () => {
        try {
            const res = await API.delete(`${endpoints.tenant}/${id}`);

            if (res.status == '202') {
                navigate('/tenants');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const submissionState = {
                ...state,
                gender: state.genderString === 'Nam' ? 0 : 1,
            };
            const res = await API.put(endpoints.tenant, submissionState);

            if (res.status == '202') {
                console.log('saved');
            }
            setEditable(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <PageWrapper>
                {/* Header */}
                <Header category="Chi tiết" title={`Cư dân`} />
                <div className="py-4">#{id}</div>
                <hr />
                <Form className="mt-6">
                    {loading ? (
                        <div></div>
                    ) : (
                        tenantFields.map((item) => (
                            <FormInput
                                key={item.field}
                                label={item.label}
                                type={item.type}
                                values={item.values}
                                value={state[item.field]}
                                setValue={(value) => onChangeState(value, item.field)}
                                readOnly={!editable || item.readOnly}
                            />
                        ))
                    )}
                    <div className="flex gap-4 justify-end">
                        {editable ? (
                            <>
                                <Button text="Hủy" onClick={() => setEditable(false)} outline />
                                <Button text="Lưu" loading onClick={handleSave} primary />
                            </>
                        ) : (
                            <>
                                <Button
                                    text="Xóa"
                                    className="bg-danger-500 text-white"
                                    onClick={() => setConfirmModalVisible(true)}
                                />
                                <Button text="Chỉnh sửa" primary onClick={() => setEditable(true)} />
                            </>
                        )}
                    </div>
                </Form>
            </PageWrapper>
            <Modal
                title="Cảnh báo"
                visible={confirmModalVisible}
                setVisible={setConfirmModalVisible}
                actions={
                    <>
                        <Button text="Hủy" onClick={() => setConfirmModalVisible(false)} outline />
                        <Button text="Xác nhận" loading onClick={handleRemove} primary />
                    </>
                }
            >
                Bạn có chắc chắn xóa?
            </Modal>
        </>
    );
};
export default TenantSingle;
