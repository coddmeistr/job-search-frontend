import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../API";


export const fetchVacancy = createAsyncThunk(
    "vacancy/fetchVacancy",
    async ({id}, {rejectWithValue, dispatch}) => {
        const response = await userAPI.fetchVacancy(id)
        if (response.status === 200){
            dispatch(setVacancy(response.data))
            dispatch(setFetchingVac(false))
            return response
        }
        else{
            dispatch(setFetchingVac(false))
            rejectWithValue(Error("Error occured."))
        }
    }
)

export const vacancyReducer = createSlice({
    name: "vacancy",
    initialState: {
        vacancy: null,
        isFetching: false,
    },
    reducers: {
        setVacancy: (state, action) => {
            state.vacancy = {...action.payload}
        },
        setFetchingVac: (state, action) => {
            state.isFetching = action.payload
        }
    }
})

export const {setVacancy, setFetchingVac} = vacancyReducer.actions

export default vacancyReducer.reducer;
