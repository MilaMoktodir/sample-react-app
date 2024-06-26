import axios, { AxiosError } from "axios";

const API_URL = "https://automatic-space-train-x5r5v9rpgrxv36j5-3000.app.github.dev/api";

export const getSeasonData = async (city: string): Promise<AllSeasonData> => {
  return new Promise<AllSeasonData>((resolve, reject) => {
    axios
      .get(`${API_URL}/season/${city}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
