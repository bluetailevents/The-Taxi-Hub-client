import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTooltip: null,
};

const tooltipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        setActiveTooltip(state, action) {
            state.activeTooltip = action.payload;
        },
    },
});

export const { setActiveTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
