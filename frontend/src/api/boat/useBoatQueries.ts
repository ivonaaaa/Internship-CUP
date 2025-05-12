import { BOATS_PATH } from "../../constants";
import { Boat, CreateBoatDto, UpdateBoatDto } from "../../types/boats";
import { api } from "../base";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchAllBoats = () => {
  return api.get<never, Boat[]>(BOATS_PATH);
};

const fetchUserBoatById = (userId: number) => {
  return api.get<never, Boat[]>(`${BOATS_PATH}/user/${userId}`);
};

const fetchBoatById = (id: number) => {
  return api.get<never, Boat>(`${BOATS_PATH}/${id}`);
};

export const useAllBoats = () => {
  return useQuery({
    queryKey: ["boats"],
    queryFn: fetchAllBoats,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUserBoats = (userId: number) => {
  return useQuery({
    queryKey: ["userBoats", userId],
    queryFn: () => fetchUserBoatById(userId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useBoat = (id: number) => {
  return useQuery({
    queryKey: ["boat", id],
    queryFn: () => fetchBoatById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });
};

export const useCreateBoat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBoat: CreateBoatDto) =>
      api.post<never, Boat>(BOATS_PATH, newBoat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boats"] });
      queryClient.invalidateQueries({ queryKey: ["userBoats"] });
    },
  });
};

export const useUpdateBoat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBoatDto }) =>
      api.patch<never, Boat>(`${BOATS_PATH}/${id}`, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boats"] });
      queryClient.invalidateQueries({ queryKey: ["userBoats"] });
      queryClient.invalidateQueries({ queryKey: ["boat", variables.id] });
    },
  });
};

export const useDeleteBoat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete<never, Boat>(`${BOATS_PATH}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boats"] });
      queryClient.invalidateQueries({ queryKey: ["userBoats"] });
    },
  });
};
