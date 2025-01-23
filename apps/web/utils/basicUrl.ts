import axios from "axios";

export const BASIC_URL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});
