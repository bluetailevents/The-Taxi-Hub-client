import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import businessService from './businessService';

const initialState = {
  businessData: [],
  selectedCompany: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

export const createBusiness = createAsyncThunk(
  'business/create',
  async (businessData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await businessService.createBusiness(businessData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBusinessData = createAsyncThunk(
  'business/fetchData',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await businessService.fetchBusinessData(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBusiness = createAsyncThunk(
  'business/update',
  async ({ businessId, businessData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await businessService.updateBusiness(businessId, businessData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBusiness = createAsyncThunk(
  'business/delete',
  async (businessId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await businessService.deleteBusiness(businessId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const selectCompany = createAsyncThunk(
  'business/selectCompany',
  async (companyId, thunkAPI) => {
    try {
      const selectedCompany = thunkAPI.getState().business.businessData.find(
        (company) => company._id === companyId
      );
      return selectedCompany || null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    resetBusiness: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    updateSelectedCompanyData: (state, action) => {
      if (state.selectedCompany) {
        state.selectedCompany = {
          ...state.selectedCompany,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBusiness.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businessData.push(action.payload);
      })
      .addCase(createBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchBusinessData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchBusinessData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businessData = action.payload;
      })
      .addCase(fetchBusinessData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateBusiness.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedBusinessIndex = state.businessData.findIndex(
          (business) => business._id === action.payload._id
        );
        if (updatedBusinessIndex !== -1) {
          state.businessData[updatedBusinessIndex] = action.payload;
        }
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteBusiness.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.businessData = state.businessData.filter(
          (business) => business._id !== action.payload.id
        );
      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(selectCompany.fulfilled, (state, action) => {
        state.selectedCompany = action.payload;
      });
  },
});

export const { resetBusiness, updateSelectedCompanyData } = businessSlice.actions;
export default businessSlice.reducer;
