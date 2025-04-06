import { createSlice } from '@reduxjs/toolkit'
export const floorQuantitySlice = createSlice({
    name: 'floor_quantity',
    initialState: {
        value: 1,
    },
    reducers: {
        twoFloor: (state) => {
            if (state.value === 2) { return; }
            state.value += 1;
        },
        oneFloor: (state) => {
            if (state.value === 1) { return; }
            state.value -= 1;
        },
    }
})

// Action creators are generated for each case reducer function
export const { twoFloor, oneFloor, } = floorQuantitySlice.actions
export default floorQuantitySlice.reducer