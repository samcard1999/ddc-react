import { createSlice } from '@reduxjs/toolkit'

export const floorCounterSlice = createSlice({
    name: 'floor_counter',
    initialState: {
        value: 1,
    },
    reducers: {
        increment: (state) => {
            if (state.value === 2) { return; }
            state.value += 1;
        },
        decrement: (state) => {
            if (state.value === 1) { return; }
            state.value -= 1;
        },
    },
})

export const { increment, decrement, } = floorCounterSlice.actions
export default floorCounterSlice.reducer