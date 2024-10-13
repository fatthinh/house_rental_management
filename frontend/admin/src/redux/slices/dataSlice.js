import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'data',
    initialState: {
        house: {
            data: null,
            loading: false,
            error: false,
        },
        agreement: {
            data: null,
            loading: false,
            error: false,
        },
        invoice: {
            data: null,
            loading: false,
            error: false,
        },
        tenant: {
            data: null,
            loading: false,
            error: false,
        },
        refresh: false,
        currentMonth: 10,
    },
    reducers: {
        loadHouse: (state, action) => {
            const payload = action.payload;
            state.house.error = payload.error;
            state.house.loading = payload.loading;
            if (!payload.loading) state.house.data = payload.data;
        },
        loadAgreement: (state, action) => {
            const payload = action.payload;
            state.agreement.error = payload.error;
            state.agreement.loading = payload.loading;
            if (!payload.loading) state.agreement.data = payload.data;
        },
        loadTenant: (state, action) => {
            const payload = action.payload;
            state.tenant.error = payload.error;
            state.tenant.loading = payload.loading;
            if (!payload.loading) state.tenant.data = payload.data;
        },
        loadInvoice: (state, action) => {
            const payload = action.payload;
            state.invoice.error = payload.error;
            state.invoice.loading = payload.loading;
            if (!payload.loading) state.invoice.data = payload.data;
        },
        refresh: (state) => {
            state.refresh = !state.refresh;
        },
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        },
    },
});
