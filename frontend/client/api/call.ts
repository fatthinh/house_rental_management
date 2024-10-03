import axios, { AxiosRequestConfig, Method } from "axios";
import { baseConfig } from "./axios";
import { Alert } from "react-native";

axios.defaults.baseURL = baseConfig.baseURL;

declare interface ApiProps {
  endpoint: string;
  data: object | null;
  config: AxiosRequestConfig | null;
  method: Method;
}

const callApi = async ({ endpoint, data, config, method }: ApiProps) => {
  try {
    const response = await axios({
      url: endpoint,
      method: method,
      data: data,
      ...config,
    });

    return response;
  } catch (error) {
    console.error("API call failed", error);
    Alert.alert("Lỗi!", "Không tìm thấy server.");
  }
};

export default callApi;
