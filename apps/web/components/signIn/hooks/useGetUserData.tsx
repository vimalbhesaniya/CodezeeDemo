import { useQuery } from "@tanstack/react-query";
import { BASIC_URL } from "../../../utils/basicUrl";

export const useGetUserData = ({ route }: { route: string }) => {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await BASIC_URL.get(route);

      return response.data
    }, 
  });
};
