import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postcodeService from './postcodeService'

const initialState = {
    postcode: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getPostcode = createAsyncThunk(
    'postcode/getPostcode',
    async (postcode, thunkAPI) => {
        try {
            return await postcodeService.getPostcode(postcode)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const postcodeSlice = createSlice({
    name: 'postcode',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostcode.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPostcode.fulfilled, (state, {payload}) => {
                state.postcode = payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getPostcode.rejected, (state, {payload}) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
    },
})

export const {reset} = postcodeSlice.actions
