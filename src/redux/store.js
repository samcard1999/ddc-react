import { configureStore } from '@reduxjs/toolkit'
import mapCounterReducer from '../components/Projects/floorCounterSlice.js'
import floorQuantity from '../components/Projects/floorQuantitySlice.js'
import dimensionsReducer from '../components/Projects/mapDimensionsSlice.js'
export default configureStore({
    reducer: {
        counter: mapCounterReducer,
        floorQuantity: floorQuantity,
        dimensions: dimensionsReducer
    },
})