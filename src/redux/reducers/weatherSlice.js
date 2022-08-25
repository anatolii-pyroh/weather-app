import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    savedCities: [],
    weatherInfo: ""
  },
  reducers: {
    addWeatherInfo(state, action) {
      state.weatherInfo = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { addWeatherInfo } = weatherSlice.actions;

export default weatherSlice.reducer;
