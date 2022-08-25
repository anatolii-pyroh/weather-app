import { createSlice } from "@reduxjs/toolkit";

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState: {
    savedCities: [],
    info: "",
  },
  reducers: {
    addCurrentWeatherInfo(state, action) {
      state.info = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { addCurrentWeatherInfo } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
