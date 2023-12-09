// In coordinatesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coordinateService from './coordinatesService';

const initialState = {
    coordinates: null,
    section: '',
    subsection: '',
    sections: [], // Add sections to initial state
    subsections: [], // Add subsections to initial state
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get coordinates
export const getCoordinates = createAsyncThunk(
    'coordinates/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            console.log(token);
            const coordinates = await coordinateService.getCoordinates(token);
            return coordinates;
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// In your Redux slice
const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        setSection: (state, action) => {
            state.section = action.payload;
            // When the section changes, filter the subsections
            if (state.coordinates && state.coordinates.coordinates && state.coordinates.coordinates[0] && state.coordinates.coordinates[0].features) {
                const uniqueSubsections = [...new Set(state.coordinates.coordinates[0].features.filter(feature => feature.properties.Section === action.payload).map(feature => feature.properties.Subsection))];
                state.subsections = uniqueSubsections;
            }
        },
        setSubsection: (state, action) => {
            state.subsection = action.payload;
        },
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCoordinates.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCoordinates.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.coordinates = action.payload;
            // When the coordinates are loaded, compute the unique sections
            if (action.payload && action.payload.coordinates && action.payload.coordinates[0] && action.payload.coordinates[0].features) {
                const uniqueSections = [...new Set(action.payload.coordinates[0].features.map(feature => feature.properties.Section))];
                state.sections = uniqueSections;
            }
        })
        .addCase(getCoordinates.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    },
});

export const { setSection, setSubsection, reset } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
