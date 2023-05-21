import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { authAPI } from "../API";


export const getAuthData = createAsyncThunk(
    "auth/getAuthData",
    async (_, {rejectWithValue}) => {
        try {
            const response = await authAPI.login()
            if (response.status === 200) {
                return response
            }
            else {
                return rejectWithValue(Error("Unauthorized."))
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const authReducer = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
})

export default authReducer.reducer;
