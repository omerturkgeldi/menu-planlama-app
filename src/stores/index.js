import { configureStore } from "@reduxjs/toolkit"
import datesReducer from "./dates"
// import authReducer from './auth'

export default configureStore({
    reducer: {
        dates: datesReducer,
        // auth: authReducer,
        // todaysDate: todaysDateReducer,
        // calories: caloriesReducer
    },
})