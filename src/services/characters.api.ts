import { axiosInstance } from "../axiosInstance/axiosInstance";

export const getCharacters = async (queryString: string) => {
  const { data } = await axiosInstance.get(`/character${queryString}`);
  return data;
};
