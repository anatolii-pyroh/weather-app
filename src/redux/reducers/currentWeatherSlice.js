import { createSlice } from "@reduxjs/toolkit";

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: {
    savedCities: [],
    info: "",
  },
  reducers: {
    addCurrentWeather(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
    saveCity(state, action) {
      state.savedCities.unshift(JSON.parse(JSON.stringify(action.payload)));
    },
    deleteCity(state, action) {
      state.savedCities = state.savedCities.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addCurrentWeather, saveCity, deleteCity } =
  currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
