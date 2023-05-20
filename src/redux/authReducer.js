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

export const signInRequest = createAsyncThunk(
    "auth/signInRequest",
    async ({login, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.singIn(login, password)
            switch (response.data.code) {
                case 0:
                    return response
                case 10:
                    return rejectWithValue(Error("Need to verify captcha."))
                default:
                    return rejectWithValue(Error("Unknown error code."))
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    })
    
    export const signUpRequest = createAsyncThunk(
        "auth/signUpRequest",
        async ({login, password, email}, {rejectWithValue, dispatch}) => {
            try {
                const response = await authAPI.signUp(login, password, email)
                switch (response.data.code) {
                    case 0:
                        return response
                    case 10:
                        return rejectWithValue(Error("Need to verify captcha."))
                    default:
                        return rejectWithValue(Error("Unknown error code."))
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        })   

export const logOutRequest = createAsyncThunk(
    "auth/logOutRequest",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.logOut()
            switch (response.data.code) {
                case 0:
                    return response
                default:
                    return rejectWithValue(Error("Unknown error code."))
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        authMe: {
            loginData: {},
            isAuth: false,
            error: null,
            status: "",
        },
        signIn: {
            error: null,
            status: ""
        },
        signUp: {
            error: null,
            status: ""
        },
    },
    reducers: {
        setLoginData: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder
            // getAuthData
            .addCase(getAuthData.pending, (state, action) => {
                state.authMe.status = "pending"
                state.authMe.error = null
            })
            .addCase(getAuthData.fulfilled, (state, action) => {
                state.authMe.loginData = action.payload.data.user
                state.authMe.isAuth = true
                state.authMe.status = "fulfilled"
                state.authMe.error = null
            })
            .addCase(getAuthData.rejected, (state, action) => {
                state.authMe.error = action.payload
                state.authMe.isAuth = false
                state.authMe.loginData = {}
                state.authMe.status = "rejected"
            })
            // signInRequest
            .addCase(signInRequest.pending, (state, action) => {
                state.signIn.status = "pending"
                state.signIn.error = null
            })
            .addCase(signInRequest.fulfilled, (state, action) => {
                state.signIn.error = null
                state.signIn.status = "fulfilled"
            })
            .addCase(signInRequest.rejected, (state, action) => {
                state.signIn.error = action.payload
                state.signIn.status = "rejected"
            })
            // signUpRequest
            .addCase(signUpRequest.pending, (state, action) => {
                state.signUp.status = "pending"
                state.signUp.error = null
            })
            .addCase(signUpRequest.fulfilled, (state, action) => {
                state.signUp.error = null
                state.signUp.status = "fulfilled"
            })
            .addCase(signUpRequest.rejected, (state, action) => {
                state.signUp.error = action.payload
                state.signUp.status = "rejected"
            })
    }
})

export const {setLoginData} = authReducer.actions

export default authReducer.reducer;
