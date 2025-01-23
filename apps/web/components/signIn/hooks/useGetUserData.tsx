import { useQuery } from "@tanstack/react-query";
import { BASIC_URL } from "../../../utils/basicUrl";

export const useGetUserData = ({ route }: { route: string }) => {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: () => {
      return BASIC_URL.post(route);
    },
  });
};
