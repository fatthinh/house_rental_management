import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(
    axiosParams.method === "GET" || axiosParams.method === "get"
  );

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const tokenAsync = await AsyncStorage.getItem("token");

      // Add token to the request headers
      const config: AxiosRequestConfig = {
        ...params,
        headers: {
          ...params.headers,
          Authorization: `Bearer ${tokenAsync}`,
        },
      };

      const result = await axios.request(config);
      setResponse(result);
    } catch (err) {
      Alert.alert("Lỗi!", "Không thể tải dữ liệu.");
      setError(err as AxiosError);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  };

  useEffect(() => {
    if (axiosParams.method === "GET" || axiosParams.method === "get") {
      fetchData(axiosParams);
    }
  }, []);

  return { response, error, loading, sendData };
};

export default useAxios;
