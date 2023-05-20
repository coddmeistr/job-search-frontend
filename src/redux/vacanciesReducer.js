import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../API";


export const fetchVacancies = createAsyncThunk(
    "vacancies/fetchVacancies",
    async ({keyword, from, to, cat, page}, {rejectWithValue, dispatch}) => {
        const response = await userAPI.fetchVacancies(keyword, from, to, cat, page)
        if (response.status === 200){
            dispatch(setVacancies(response.data))
            dispatch(setFetchingVacs(false))
            return response
        }
        else{
            dispatch(setFetchingVacs(false))
            rejectWithValue(Error("Error occured."))
        }
    }
)

export const fetchCatalogues = createAsyncThunk(
    "vacancies/fetchCatalogues",
    async (_, {rejectWithValue, dispatch}) => {
        const response = await userAPI.fetchCatalogues()
        if (response.status === 200){
            dispatch(setCatalogues(response.data))
            return response
        }
        else{
            rejectWithValue(Error("Error occured."))
        }
    }
)

export const vacanciesReducer = createSlice({
    name: "vacancies",
    initialState: {
        page: 1,
        totalPages: 0,
        vacancies: [],
        catalogues: [],
        nameKeyPairs: {},
        favlist: [],
        filterSalaryFrom: 0,
        filterSalaryTo: 0,
        filterCatalogue: null,
        usedKeyword: "",
        isFetching: false,
    },
    reducers: {
        setVacancies: (state, action) => {
            state.vacancies = action.payload.objects
            state.totalPages = Math.floor(action.payload.total / 20)
        },
        setCatalogues: (state, action) => {
            state.catalogues = action.payload
            state.catalogues.map(item => {
                state.nameKeyPairs[item.title] = item.key
                return 0
            })
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setFilters: (state, action) => {
            state.filterCatalogue = action.payload.cat
            state.filterSalaryFrom = action.payload.from
            state.filterSalaryTo = action.payload.to
        },
        setUsedKeyword: (state, action) => {
            state.usedKeyword = action.payload
        },
        setFavList: (state, action) => {
            state.favlist = action.payload
        },
        setFetchingVacs: (state, action) => {
           state.isFetching = action.payload
        }
    }
})

export const {setVacancies, setPage, setFilters, setUsedKeyword, setCatalogues, setFavList, setFetchingVacs} = vacanciesReducer.actions

export default vacanciesReducer.reducer;
