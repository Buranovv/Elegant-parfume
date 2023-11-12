import { ENDPOINT, TOKEN } from "@/constants";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log(err);
    toast.error(err.response.data.msg);

    return Promise.reject(err);
  },
);

export default request;
