"use client";

import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "../../../hooks/useCookie";
import { authKeys } from "../../../queryKeysFactories/auth";
import { FormType } from "../../../types/form";
import { BASIC_URL } from "../../../utils/basicUrl";
import type { FormValuesTypes } from "../type";

type UseLoginApiProps<T> = Omit<
    UseMutationOptions<T, FormValuesTypes, FormValuesTypes>,
    "mutationFn" | "mutationKey"
>;

export function useCreateApi<T extends FormType>({
    route,
    options,
}: {
    route: string;
    options?: UseLoginApiProps<T>;
}) {
    return useMutation<T, FormValuesTypes, FormValuesTypes>({
        mutationKey: authKeys.create(),
        mutationFn: async (data: FormValuesTypes) => {
            const response = await BASIC_URL.post(route, data);

            setCookie({
                name: "token",
                value: response.data?.token,
            });

            return response.data;
        },
        ...options,
    });
}
