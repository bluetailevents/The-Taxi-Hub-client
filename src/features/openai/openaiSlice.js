import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import openaiService from './openaiService';

const initialState = {
  chatHistory: [], // Initialize chatHistory array
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

export const sendMessage = createAsyncThunk(
  'openai/sendMessage',
  async (message, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await openaiService.sendMessageToAI(token, message);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const openaiSlice = createSlice({
  name: 'openai',
  initialState,
  reducers: {
    resetOpenAI: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chatHistory = [...state.chatHistory, { role: 'user', content: action.meta.arg }];
        state.chatHistory = [...state.chatHistory, { role: 'ai', content: action.payload }];
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetOpenAI } = openaiSlice.actions;
export default openaiSlice.reducer;
