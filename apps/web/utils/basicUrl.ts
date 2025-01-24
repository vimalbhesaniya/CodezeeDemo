import axios from "axios";
console.log("call--process.env.NEXTAUTH_URL", process.env.NEXT_PUBLIC_URL);
export const BASIC_URL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});
