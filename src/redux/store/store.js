import { configureStore } from "@reduxjs/toolkit";
import  weatherSlice from "../reducer/weatherSlice";

export const store = configureStore({
    reducer: {
        weather: weatherSlice
    }
})
