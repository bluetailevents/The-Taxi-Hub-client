import { createSlice } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
finishButton: false
};

// Define the slice
export const actionSlice = createSlice({
name: 'component',
initialState,
reducers: {
    toggleFinish: (state) => {
    state.finishButton = !state.finishButton;
    },
},
});

export const { toggleFinish } = actionSlice.actions;
export default actionSlice.reducer;
