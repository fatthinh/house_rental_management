import Header from '@/components/Header';
import Form from '@/components/Form/Form';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PageWrapper from '@/components/PageWrapper';
import { useState, useEffect } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useNavigate } from 'react-router-dom';
import API, { endpoints } from '@/configs/API';
import { houseFields } from '@/utils';

const HouseSingle = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { response, error, loading } = useAxios({
        url: `${endpoints.house}/${id}`,
        method: 'GET',
    });
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const [editable, setEditable] = useState(false);
    const [state, setState] = useState({
        name: '',
        price: '',
        floor: '',
        size: '',
        description: '',
        state: '',
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
        if (response) {
            setState(response);
        }
    }, [loading]);

    const handleRemove = async () => {
        try {
            const res = await API.delete(`${endpoints.house}/${id}`);

            if (res.status == '202') {
                navigate('/houses');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const res = await API.put(endpoints.house, state);

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
                        houseFields.map((item) => (
                            <FormInput
                                key={item.field}
                                label={item.label}
                                type={item.type}
                                values={item.values}
                                value={editable ? state[item.field] : response[item.field]}
                                setValue={(value) => onChangeState(value, item.field)}
                                readOnly={!editable}
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
export default HouseSingle;
