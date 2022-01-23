import { createSlice } from "@reduxjs/toolkit";

export const dates = createSlice({
    name: 'dates',
    initialState: {
        today: new Date().getTime(),
    },
    reducers: {
        setReduxDate: (state, action) => {
            state.today = new Date(action.payload).getTime()
        },
        toYesterday: state => {
            state.today = new Date(state.today - 24 * 60 * 60 * 1000).getTime()
        },
        toTomorrow: state => {
            state.today = new Date(state.today + 24 * 60 * 60 * 1000).getTime()
        },
        setToday: (state, action) => {
            state.today = new Date().getTime()
        }
    }
})

export const { setReduxDate, toYesterday, toTomorrow, setToday } = dates.actions

export default dates.reducer