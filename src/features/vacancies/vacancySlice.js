import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vacancyService from './vacancyService'

const initialState = {
    vacancies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new vacancy
export const createVacancy = createAsyncThunk(
    'vacancies/create',
    async (vacancyData, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user.token
        return await vacancyService.createVacancy(vacancyData, token)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get vacancies
export const getVacancies = createAsyncThunk(
    'vacancies/getAll',
    async (_, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user.token
        return await vacancyService.getVacancies(token)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const vacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createVacancy.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createVacancy.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.vacancies.push(action.payload)
        })
        .addCase(createVacancy.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getVacancies.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getVacancies.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.vacancies = action.payload
        })
        .addCase(getVacancies.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset } = vacancySlice.actions
export default vacancySlice.reducer
