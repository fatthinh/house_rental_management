import axios from "axios";
// const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
const serverUrl = "http://192.168.1.22:8222";

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
  chatDetail: (id: String, userId: String) =>
    `/social/chat/${id}?userId=${userId}`,
  addMessage: (chatId: String) => `/social/chat/${chatId}`,
  newChat: "/social/chat",

  //user
  user: (userId: String) => `/identity/user/${userId}`,
  currentUser: "/identity/user/current-user",
  userList: "/identity/user",

  //service
  service: "/service",

  //rental
  agreement: "/rental/agreement"
};

export default axios.create(baseConfig);
