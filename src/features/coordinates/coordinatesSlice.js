import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import coordinateService from './coordinatesService';

const initialState = {
  coordinates: null,
  section: '',
  subsection: '',
  sections: [],
  subsections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Async thunk for fetching sections
export const fetchSections = createAsyncThunk(
  'coordinatesSlice/fetchSections',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/sections`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching subsections
export const fetchSubsections = createAsyncThunk(
  'coordinatesSlice/fetchSubsections',
  async (section, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/subsections`, {
        params: { section },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Existing getCoordinates thunk
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

// Slice
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
    setMethod: (state, action) => {
      state.method = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSubsections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubsections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subsections = action.payload;
      })
      .addCase(fetchSubsections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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

export const { setSection, setSubsection, reset, setMethod } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
