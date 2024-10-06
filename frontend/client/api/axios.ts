import axios from "axios";
// const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
const serverUrl = "http://192.168.1.3:8222";

export const baseConfig = {
  baseURL: `${serverUrl}/api/v1`,
};

export const endpoints = {
  // authentication
  login: "/identity/auth/token",
  // payment
  allInvoice: "/payment/invoice",
  singleInvoice: (invoiceId: number) => `/payment/invoice/${invoiceId}`,
  // checkout
  integrated: "/payment/checkout/integrated",
  pay: "/payment/checkout/pay",

  // chat
  chat: (userId: String) => `/social/chat?userId=${userId}`,

  //user
  user: (userId: String) => `/identity/user/${userId}`
};

export default axios.create(baseConfig);
