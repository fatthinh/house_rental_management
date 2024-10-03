import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'app',
    initialState: {
        activeMenu: true,
        currentColor: '#2494f0',
        isClicked: {
            chat: false,
            userProfile: false,
            notification: false,
        },
        toast: {
            newNotification: true,
        },
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
        handleClick: (state, action) => {
            Object.keys(state.isClicked).forEach((key) => {
                if (key === action.payload) state.isClicked[action.payload] = !state.isClicked[action.payload];
                else state.isClicked[key] = false;
            });
        },
        toggleToast: (state, action) => {
            const { toastName } = action.payload;
            state.toast[toastName] = !state.toast[toastName];
        },
    },
});
