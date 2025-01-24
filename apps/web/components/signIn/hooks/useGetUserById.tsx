import { useQuery } from "@tanstack/react-query";
import { BASIC_URL } from "../../../utils/basicUrl";

export const useGetUserDataById = ({ route, userId }: { route: string, userId: string }) => {
    return useQuery({
        queryKey: ["profileData", userId],
        queryFn: async () => {
            const response = await BASIC_URL.get(route);

            return response.data
        },
        enabled: !!userId
    });
};
