"use server";
import { cookies } from "next/headers";
import { DeleteCookieType, GetCookieType, SetCookieType } from "../types/hooks";

const COOKIE = cookies();

export const getCookie = ({ name }: GetCookieType) => {
  return COOKIE.get(name);
};

export const setCookie = ({ name, value, options }: SetCookieType) => {
  COOKIE.set(name, value, { ...options });
};

export const deleteCookie = ({ name }: DeleteCookieType) => {
  COOKIE.delete(name);
};
