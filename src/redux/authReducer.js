import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../API";


export const getAccessToken = createAsyncThunk(
    "auth/getAccessToken",
    async (_, { rejectWithValue }) => {
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

export const getRefreshedToken = createAsyncThunk(
    "auth/getRefreshedToken",
    async (token, { rejectWithValue }) => {
        try {
            const response = await authAPI.refreshToken(token)
            if (response.status === 200) {
                return response
            }
            else {
                return rejectWithValue(Error("Failed."))
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        authError: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccessToken.rejected, (state, _) => {
            state.authError = {text: "Error while getting access token"}
        });

        builder.addCase(getRefreshedToken.rejected, (state, _) => {
            state.authError = {text: "Error while getting refreshed access token"}
        });
    }
})

export const {setAuth} = authReducer.actions

export default authReducer.reducer;
