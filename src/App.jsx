import "./App.css";
import { Container, Box, TextField, Button } from "@mui/material";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import { getApi } from "./api/api"

function App() {

  // receiving data from input (geoDB cities API) and send it to getApi function
  const handleOnSearchChange = (cityData) => {
    console.log(cityData)
    getApi(cityData.value);
  };

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
