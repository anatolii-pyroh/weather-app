import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions } from "../../api/index";

const CitiesAutoComplete = ({ onSearchChange }) => {
  // sending info to App.js after selecting a city from list
  const handleOnChange = (searchData) => {
    onSearchChange(searchData);
  };
  return (
    <div>
      <AsyncPaginate
        placeholder='Search for city...'
        debounceTimeout={500}
        value={""}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default CitiesAutoComplete;
