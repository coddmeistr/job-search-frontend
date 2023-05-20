import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import vacanciesReducer from "./vacanciesReducer";
import vacancyReducer from "./vacancyReducer";
import Favorites from './../Content/Favorites/Favorites';
import favoritesReducer from "./favoritesReducer";


export const store = configureStore({
    reducer: {
        vacancies: vacanciesReducer,
        auth: authReducer,
        vacancy: vacancyReducer,
        favorites: favoritesReducer
    }
})

export default store;