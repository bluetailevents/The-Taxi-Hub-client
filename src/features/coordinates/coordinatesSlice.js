import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coordinatesService from './coordinatesService';

const initialState = {
    sections: [],
    subsections: {},
    categories: [],
    streets: [],
    coordinates: [],
    loading: false,
    error: null,
    loaded: false, // Flag to indicate if the data has been loaded
};


// Async thunk for fetching subsections
export const fetchSubsections = createAsyncThunk(
    'coordinatesSlice/fetchSubsections',
    async (_, { rejectWithValue }) => {
        try {
            const response = await coordinatesService.getSubsections();
            // Transform the array of objects into an object with section names as keys
            const subsectionsBySection = response.reduce((acc, current) => {
                acc[current.Section] = current.Subsections;
                return acc;
            }, {});
            return subsectionsBySection;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk for fetching the GeoJSON data
export const fetchCoordinates = createAsyncThunk(
    'coordinatesSlice/fetchCoordinates',
    async (_, { rejectWithValue }) => {
        try {
            return await coordinatesService.getCoordinates();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const coordinatesSlice = createSlice({
    name: 'coordinatesSlice',
    initialState,
    reducers: {
        // Define your synchronous actions here, if any
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubsections.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubsections.fulfilled, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.sections = Object.keys(action.payload); // Assuming the payload is an object with sections as keys
                state.subsections = action.payload; // Assuming the payload is an object with sections as keys and arrays of subsections as values
            })
            .addCase(fetchSubsections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            .addCase(fetchCoordinates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCoordinates.fulfilled, (state, action) => {
                state.loading = false;
                // Update the state with the fetched coordinates
                state.coordinates = action.payload; // Make sure this matches the structure of your state
            })  
            .addCase(fetchCoordinates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default coordinatesSlice.reducer;
