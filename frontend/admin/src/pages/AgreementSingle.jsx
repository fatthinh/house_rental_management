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

const fields = [
    {
        field: 'deposit',
        label: 'Tiền cọc',
        locale: true,
    },
    {
        field: 'startDate',
        label: 'Ngày bắt đầu',
        type: 'date',
    },
];

const AgreementSingle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { response, error, loading } = useAxios({
        method: 'GET',
        url: `${endpoints.agreement}/${id}`,
    });
    const {
        response: housesRes,
        error: housesErr,
        loading: housesLoading,
    } = useAxios({
        method: 'GET',
        url: `${endpoints.house}`,
    });
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [editable, setEditable] = useState(false);
    const [addTenantModalVis, setAddTenantModalVis] = useState(false);
    const [serviceModalVis, setServiceModalVis] = useState(false);
    const [housesModalVis, setHousesModalVis] = useState(false);
    const [state, setState] = useState({
        deposit: '',
        startDate: '',
    });

    useEffect(() => {
        if (response && housesRes) {
            const house = housesRes.find((item) => item.id == response.houseId);
            setState({
                ...response,
                house: house.name,
            });
        }
    }, [loading, housesLoading, editable]);

    const onChangeState = (value, field) => {
        setState((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleRemove = async () => {
        try {
            const res = await API.delete(`${endpoints.agreement}/${id}`);

            if (res.status == '202') {
                navigate('/agreements');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const houseId = housesRes.find((item) => item.name == state.house).id;

            const res = await API.put(endpoints.agreement, {
                ...state,
                houseId: houseId,
                deposit: Number(state.deposit),
            });

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
                <Header category="Chi tiết" title="Hợp đồng" />
                <div className="py-2">#{id}</div>
                <hr />
                <Form className="mt-6">
                    {loading ? (
                        <div></div>
                    ) : (
                        <>
                            <div className="py-2 mb-8 text-xs text-end">
                                {formatDate(response?.createdDate)}
                                <span className="ml-2 px-4 py-1 rounded-md bg-accent-200">{response?.state}</span>
                            </div>

                            <FormInput
                                label="Người thuê"
                                value={response.tenants?.find((item) => item.id === response.representer).name}
                                readOnly
                            />
                            <FormInput
                                label="Di động"
                                value={response.tenants?.find((item) => item.id === response.representer).phone}
                                readOnly
                            />

                            {fields.map((item) => (
                                <FormInput
                                    key={item.field}
                                    label={item.label}
                                    type={item.type}
                                    values={item.values}
                                    value={
                                        // editable
                                        //     ? state[item.field]
                                        //     : item.locale
                                        //     ? parseInt(response[item.field]).toLocaleString()
                                        //     : response[item.field]
                                        item.locale && !editable
                                            ? parseInt(state[item.field]).toLocaleString()
                                            : state[item.field]
                                    }
                                    setValue={(value) => onChangeState(value, item.field)}
                                    readOnly={!editable || item.readOnly}
                                />
                            ))}

                            {housesRes && (
                                <FormInput
                                    label="Phòng"
                                    value={
                                        editable
                                            ? state['house']
                                            : housesRes.find((item) => item.id == response.houseId).name
                                    }
                                    readOnly
                                    onFocus={() => {
                                        if (editable) setHousesModalVis(true);
                                    }}
                                />
                            )}

                            <div className="py-2 mb-6">
                                <h3 className="text-sm">Số người: {state.tenants?.length}</h3>
                                <ul className="max-w-[50%] mt-2">
                                    {state.tenants?.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex justify-between border-b px-3 py-1 hover:border-neutral-500"
                                        >
                                            {item.name}
                                            <span>
                                                {item.phone}
                                                {response.representer != item.id && (
                                                    <button
                                                        onClick={() =>
                                                            onChangeState(
                                                                state.tenants.filter((tenant) => tenant.id !== item.id),
                                                                'tenants',
                                                            )
                                                        }
                                                        disabled={!editable}
                                                        className="z-10 ml-4 italic text-xs"
                                                    >
                                                        Xóa
                                                    </button>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <div className="flex items-center mt-2">
                                    <h3 className="text-sm">Các khoản phí: </h3>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setServiceModalVis(true);
                                        }}
                                        className="px-1 ml-2 italic hover:border-b hover:border-neutral-300 text-xs"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div> */}
                        </>
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
            {/* <Modal
                title="Chọn Cư dân"
                visible={addTenantModalVis}
                setVisible={setAddTenantModalVis}
                actions={
                    <Button
                        text="Thoát"
                        onClick={() => {
                            setAddTenantModalVis(false);
                        }}
                        outline
                    />
                }
            >
                <SearchBox className="pl-0 max-w-full" />
                <ul className="my-2 py-2 overflow-y-scroll max-h-[50vh]" >
                    <li className="flex justify-between border-b hover:border-neutral-400 py-1 mr-2">
                        #qewhqiodnasod
                        <span>Lâm Phát Thịnh</span>
                        0335037042
                        <button className="italic text-xs">Chọn</button>
                    </li>
                </ul>
            </Modal> */}
            <Modal
                title="Dịch vụ"
                visible={serviceModalVis}
                setVisible={setServiceModalVis}
                actions={
                    <>
                        <Button text="Thoát" onClick={() => setServiceModalVis(false)} outline />
                    </>
                }
            >
                <ul>
                    <li className="flex justify-between pr-8">
                        Điện: <span className="">3.000 VNĐ/KW</span>
                    </li>
                    <li className="flex justify-between pr-8">
                        Nước: <span className="">20.000 VNĐ/Khối</span>
                    </li>
                    <li className="flex justify-between pr-8">
                        Xe: <span className="">130.000 VNĐ/Chiếc</span>
                    </li>
                    <li className="flex justify-between pr-8">
                        Rác: <span className="">20.000 VNĐ/Người</span>
                    </li>
                    <li className="flex justify-between pr-8">
                        Phí quản lý: <span className="">80.000 VNĐ</span>
                    </li>
                </ul>
            </Modal>
            <Modal title="Chọn phòng" visible={housesModalVis} setVisible={setHousesModalVis}>
                <ul className="h-[240px] overflow-auto">
                    {housesRes
                        ?.filter((item) => item.state == 'Trống' || item.id == response?.houseId)
                        .map((item) => (
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
export default AgreementSingle;
