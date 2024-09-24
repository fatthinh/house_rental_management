import axios from 'axios';

const baseConfig = {
    baseURL: 'http://localhost:8222/api/v1',
};

export const endpoints = {
    tenant: 'rental/tenant',
    agreement: 'rental/agreement',
    house: 'house',
    invoice: 'payment/invoice',
    service: 'service',
};

export default axios.create(baseConfig);
