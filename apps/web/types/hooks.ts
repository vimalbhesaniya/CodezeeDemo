import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type GetCookieType = {
  name: string;
};

export type SetCookieType = {
  name: string;
  value: string;
  options?:ResponseCookie
};

export type DeleteCookieType = {
    name: string;
  };