export const USER_LIST_BASIC_URL = "/data";

export const USER_LIST_ROUTE = {
  get: USER_LIST_BASIC_URL,
};


export const USER_BY_ID_ROUtE = {
  get: (userid:string)=>`${USER_LIST_BASIC_URL}/${userid}`,
};