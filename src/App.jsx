import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Box } from "@mui/material";


function App() {
  const [weatherData, setWeatherData] = useState();

  const getApi = async () => {
    const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Киев&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    const response = request.data
    console.log(response)
  };

  useEffect(() => {
    getApi()
  }, [])
  return (
    <div className='App'>
      <Container maxWidth='xl'>
        <Box>123</Box>
      </Container>
    </div>
  );
}

export default App;
