import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../base";
import { UpdateUserDto, User } from "../../types";
import { USERS_PATH } from "../../constants";

const fetchUserById = (id: number) => {
  return api.get<never, User>(`${USERS_PATH}/${id}`);
};

const updateUser = ({ id, data }: { id: number; data: UpdateUserDto }) => {
  return api.patch<never, User>(`${USERS_PATH}/${id}`, data);
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
