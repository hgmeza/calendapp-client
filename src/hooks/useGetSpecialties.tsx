import { useQuery } from "react-query";
import {
  getAllSpecialties,
  getBySpecialties,
  getProvider,
} from "../services/specialty";

const key = "specialties";

export const useGetSpecialties = () => {
  return useQuery([key], getAllSpecialties, { staleTime: Infinity });
};

export const useGetBySpecialties = (specialty: string) => {
  return useQuery([key, specialty], () => getBySpecialties(specialty), {
    staleTime: Infinity,
    enabled: false,
  });
};

export const useGetProvider = (specialty: string, provider: string) => {
  return useQuery(
    [key, specialty, provider],
    () => getProvider(specialty, provider),
    {
      refetchInterval: 10000,
    },
  );
};
