import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'app',
    initialState: {
        activeMenu: true,
        currentColor: '#2494f0',
    },
    reducers: {
        toggleMenu: (state, action) => {
            state.activeMenu = !state.activeMenu;
        },
        showMenu: (state, action) => {
            state.activeMenu = true;
        },
        hideMenu: (state, action) => {
            state.activeMenu = false;
        },
    },
});
