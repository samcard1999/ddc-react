import { createSlice } from '@reduxjs/toolkit';

export const mapDimensionsSlice = createSlice({
    name: 'dimensions',
    initialState: {
        width: 0,
        height: 0
    },
    reducers: {
        updateDimensions: (state, action) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        }
    }
});

export const { updateDimensions } = mapDimensionsSlice.actions;
export default mapDimensionsSlice.reducer;