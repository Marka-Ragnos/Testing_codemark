import axios, { AxiosInstance } from "axios";

// export const getResource = async (TAG: string) => {
//   const API_KEY: string = "fsBPFAKh0RjSshJA4PjDwLiDFxfLPAyq";
//   const API_BASE: string = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`;
//   const res = await axios(`${API_BASE}${TAG}`);

//   if (res.status !== 200) {
//     alert(
//       `Произошла http ошибка по адресу ${API_BASE}${TAG}, статус ошибки ${res.status}`
//     );
//   }
//   return await res;
// };

const API_KEY: string = "fsBPFAKh0RjSshJA4PjDwLiDFxfLPAyq";
const API_BASE: string = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=`;
const TIMEOUT = 5000;

const createAPI = () => {
  const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: TIMEOUT,
  });
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
