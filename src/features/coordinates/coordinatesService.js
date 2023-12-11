    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    const initialState = {
    sections: [],
    subsections: [],
    categories: [],
    streets: [],
    loading: false,
    error: null,
    };

    // Async thunk for fetching sections
    export const fetchSections = createAsyncThunk(
    'geojson/fetchSections',
    async (section, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/geojson/sections`, {
            params: { section },
        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    // Async thunk for fetching subsections
    export const fetchSubsections = createAsyncThunk(
    'geojson/fetchSubsections',
    async (sections, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/geojson/subsections`, {
            params: { sections },
        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    // Async thunk for fetching categories
    export const fetchCategories = createAsyncThunk(
    'geojson/fetchCategories',
    async ({ sections, subsections }, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/geojson/categories`, {
            params: { sections, subsections },
        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    // Async thunk for fetching streets
    export const fetchStreets = createAsyncThunk(
    'geojson/fetchStreets',
    async (categories, { rejectWithValue }) => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/geojson/streets`, {
            params: { categories },
        });
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    const geojsonSlice = createSlice({
    name: 'geojson',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSections.pending]: (state) => {
        state.loading = true;
        },
        [fetchSections.fulfilled]: (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        },
        [fetchSections.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        // Add extraReducers for other thunks similarly...
        [fetchSubsections.pending]: (state) => {
        state.loading = true;
        },
        [fetchSubsections.fulfilled]: (state, action) => {
        state.loading = false;
        state.subsections = action.payload;
        },
        [fetchSubsections.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [fetchCategories.pending]: (state) => {
        state.loading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        [fetchStreets.pending]: (state) => {
        state.loading = true;
        },
        [fetchStreets.fulfilled]: (state, action) => {
        state.loading = false;
        state.streets = action.payload;
        },
        [fetchStreets.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        }
    },
    });

    export const { reducer } = geojsonSlice;
    export default geojsonSlice.actions;
