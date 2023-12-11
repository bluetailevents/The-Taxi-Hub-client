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
  'coordinatesSlice/fetchSections',
  async (section, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/sections`, {
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
  'coordinatesSlice/fetchSubsections',
  async (section, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/subsections`, {
        params: { section },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'coordinatesSlice/fetchCategories',
  async ({ section, subsection }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/categories`, {
        params: { section, subsection },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching streets
export const fetchStreets = createAsyncThunk(
  'coordinatesSlice/fetchStreets',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/streets`, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const coordinatesSlice = createSlice({
  name: 'coordinatesSlice',
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
    },
  },
});

export const { reducer } = coordinatesSlice;
export default coordinatesSlice.reducer;
