export const authKeys = {
  all: ["auth"] as const,

  login: (requestBody: object = {}) => [...authKeys.all, "login", requestBody],
};
