import { configureStore, current } from '@reduxjs/toolkit'
import mapCounterReducer from '../components/Projects/floorCounterSlice.js'
import floorQuantity from '../components/Projects/floorQuantitySlice.js'
import dimensionsReducer from '../components/Projects/mapDimensionsSlice.js'
import { slideCurrentSlice } from '@/components/Projects/SlideCurrentSlice.js'
export default configureStore({
    reducer: {
        counter: mapCounterReducer,
        floorQuantity: floorQuantity,
        dimensions: dimensionsReducer,
        current: slideCurrentSlice
    },
})