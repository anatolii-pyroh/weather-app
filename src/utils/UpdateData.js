import { getApi } from "../api/index";

// update current day weather if any city is shown at screen
export const updateData = async (weather) => {
  const cityName = `${weather?.name}, ${weather?.sys.country}`;
  const response = await getApi(cityName);
  return response
};
