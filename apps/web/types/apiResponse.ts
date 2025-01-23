import { HttpCodeNumbers } from "../constants/httpStatus";

export type ApiSuccessResponse<Data> = {
  statusCode: HttpCodeNumbers;
  message: string;
  data: Data;
};

export type ApiErrorResponse = {
  statusCode: HttpCodeNumbers;
  message: string;
};
