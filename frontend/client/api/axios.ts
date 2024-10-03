import axios from "axios";
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

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
  pay: "/payment/checkout/pay"

};

export default axios.create(baseConfig);
