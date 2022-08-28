import { getApi } from "../api/index";

export const updateData = async (weather) => {
  const cityName = `${weather?.name}, ${weather?.sys.country}`;
  const response = await getApi(cityName);
  return response
};
