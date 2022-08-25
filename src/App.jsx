import "./App.css";
import { useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import { getApi } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { addWeatherInfo } from "./redux/reducers/weatherSlice";

function App() {
  const weather = useSelector((state) => {
    return state.weather.weatherInfo
  })
  const dispatch = useDispatch()
  // receiving data from input (geoDB cities API) and send it to getApi function,
  // also giving our state from redux a new value(city info)
  const handleOnSearchChange = async (cityData) => {
    const response = await getApi(cityData.value)
    dispatch(addWeatherInfo(response))
  };

  useEffect(() => {
    console.log(weather)
  }, [weather])

  return (
    <Container maxWidth='xl'>
      <div className='App'>
        <CitiesAutoComplete onSearchChange={handleOnSearchChange} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          123
        </Box>
      </div>
    </Container>
  );
}

export default App;
