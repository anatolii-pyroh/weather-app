import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Box, TextField, Button } from "@mui/material";

function App() {
  const [weatherData, setWeatherData] = useState();
  const [inputValue, setInputValue] = useState("");

  const getApi = async (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 3) {
      const request = await axios.get(
        `${import.meta.env.VITE_BASIC_URL}?q=${inputValue}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      setInputValue("");
      const response = request.data;
      console.log(response);
      setWeatherData(response);

    }
  };

  return (
    <Container maxWidth='xl'>
      <Box className='App'>
        <h1>{weatherData?.name},{weatherData?.sys?.country}</h1>
        <Box>
          <form autoComplete='off' onSubmit={getApi}>
            <TextField
              label='enter city name'
              variant='outlined'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <Button type='submit' variant='contained' sx={{ mt: 2 }} fullWidth>
              Find
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
