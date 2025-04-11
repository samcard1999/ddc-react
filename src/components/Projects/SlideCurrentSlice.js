import { createSlice } from '@reduxjs/toolkit';

export const slideCurrentSlice = createSlice({
    name: 'slideCurrent',
    initialState: {
        value: ''
    },
    reducers: {
        current: (state) => {

        }
    }
});

export const { current } = slideCurrentSlice.actions;
export default slideCurrentSlice.reducer;