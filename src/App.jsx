import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Container, Box, TextField, Button } from "@mui/material";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";

function App() {
  const getApi = async (cityInfo) => {
    const request = await axios.get(
      `${
        import.meta.env.VITE_WEATHER_API_URL
      }?q=${cityInfo}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    const response = request.data;
    console.log(response);
  };
  const handleOnSearchChange = (cityData) => {
    console.log(cityData);
    getApi(cityData.value);
  };
  return (
    <Container maxWidth='xl'>
      <div className='App'>
        <CitiesAutoComplete onSearchChange={handleOnSearchChange} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>123</Box>
        {/* <h1>{weatherData?.name} {weatherData?.sys?.country}</h1>
        <Box>
          <form autoComplete='off' onSubmit={getApi}>
            <TextField
              label='enter city name'
              variant='outlined'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              size="small"
            />
            <Button type='submit' variant='contained' sx={{ mt: 2 }} fullWidth>
              Find
            </Button>
          </form>
        </Box> */}
      </div>
    </Container>
  );
}

export default App;
