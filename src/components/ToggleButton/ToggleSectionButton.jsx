import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

const ToggleSectionButton = ({ alignment, handleChangeAlignment }) => {
  
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
        <ToggleButton value='forecast'>Forecast</ToggleButton>
        <ToggleButton value='saved cities'>Saved cities</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleSectionButton;
