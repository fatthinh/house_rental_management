import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookie from 'react-cookies';
import API, { endpoints } from '@/configs/API';
import { Navigate } from 'react-router-dom';

// Thunk for async introspection
export const authenticateAsync = createAsyncThunk(endpoints.introspect, async (_, { rejectWithValue }) => {
    const token = cookie.load('token');
    if (!token) {
        return false;
    }

    try {
        const res = await API.post(endpoints.introspect, { token });
        return res.data.valid; // Return valid status to update the state
    } catch (error) {
        console.error(error);
        return rejectWithValue(false); // Reject with error
    }
});

export default createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
    },
    reducers: {
        signIn: (state, action) => {
            state.isAuthenticated = true;
            cookie.save('token', action.payload);
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            cookie.remove('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateAsync.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload;
            state.loading = false;
        });
        builder.addCase(authenticateAsync.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false;
        });
    },
});
