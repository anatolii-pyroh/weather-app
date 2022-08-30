import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";

const ToggleSectionButton = ({ alignment, handleChangeAlignment }) => {
  // show "saved cities" button if any is saved
  const isAnyCitySaved = useSelector(
    (state) => state.currentWeather.savedCities
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChangeAlignment}
        aria-label='Platform'
      >
        <ToggleButton value='daily'>Daily</ToggleButton>
        <ToggleButton value='5 days forecast'>5 Days forecast</ToggleButton>
        {isAnyCitySaved.length > 0 && (
          <ToggleButton value='saved cities'>Saved cities</ToggleButton>
        )}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleSectionButton;
