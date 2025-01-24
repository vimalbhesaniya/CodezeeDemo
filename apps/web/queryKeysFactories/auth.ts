export const authKeys = {
  all: ["auth"] as const,

  login: (requestBody: object = {}) => [...authKeys.all, "login", requestBody],
  create: (requestBody: object = {}) => [
    ...authKeys.all,
    "create",
    requestBody,
  ],
};
