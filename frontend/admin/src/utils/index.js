// timestamp
export const formatDate = (string) => {
    // Convert string to Date object
    const dateObj = new Date(string);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `Ngày ${day}-${month}-${year}, lúc ${hours}:${minutes}:${seconds}`;
};

export const localeString = (string) => {
    return parseInt(string).toLocaleString();
};

export const tenantFields = [
    {
        field: 'name',
        label: 'Họ và tên',
    },
    {
        field: 'dob',
        label: 'Ngày sinh',
        type: 'date',
    },
    {
        field: 'citizenId',
        label: 'Số CCCD',
    },
    {
        field: 'phone',
        label: 'Số điện thoại',
    },
    {
        field: 'email',
        label: 'Email',
    },
    {
        field: 'genderString',
        label: 'Giới tính',
        values: ['Nam', 'Nữ'],
    },
    {
        field: 'hometown',
        label: 'Quê quán',
    },
    {
        field: 'house',
        label: 'Phòng',
        readOnly: true,
    },
];

export const agreementFields = [
    {
        field: 'name',
        label: 'Họ và tên',
    },
    {
        field: 'dob',
        label: 'Ngày sinh',
        type: 'date',
    },
    {
        field: 'citizenId',
        label: 'Số CCCD',
    },
    {
        field: 'phone',
        label: 'Số điện thoại',
    },
    {
        field: 'email',
        label: 'Email',
    },
    {
        field: 'genderString',
        label: 'Giới tính',
        values: ['Nam', 'Nữ'],
    },
    {
        field: 'hometown',
        label: 'Quê quán',
    },
    {
        field: 'deposit',
        label: 'Tiền cọc',
    },
    {
        field: 'startDate',
        label: 'Ngày bắt đầu',
        type: 'date',
    },
    {
        field: 'house',
        label: 'Phòng',
        readOnly: true,
    },
];

export const houseFields = [
    {
        field: 'name',
        label: 'Tên phòng',
    },
    {
        field: 'price',
        label: 'Giá',
    },
    {
        field: 'floor',
        label: 'Tầng',
    },
    {
        field: 'size',
        label: 'Kích thước',
    },
    {
        field: 'description',
        label: 'Mô tả',
    },
    {
        field: 'state',
        label: 'Trạng thái',
        values: ['Trống', 'Đã thuê', 'Bận'],
    },
];

export const invoiceFields = [
    {
        field: 'id',
        label: 'Mã hóa đơn ',
    },
    {
        field: 'month',
        label: 'Tháng',
    },
    {
        field: 'houseName',
        label: 'Phòng',
    },
    {
        field: 'housePrice',
        label: 'Giá phòng',
    },
    {
        field: 'amount',
        label: 'Tổng hóa đơn',
    },
    {
        field: 'state',
        label: 'Trạng thái',
    },
];
