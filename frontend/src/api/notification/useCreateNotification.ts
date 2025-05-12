import { useMutation } from "@tanstack/react-query";
import { api } from "../base";
import { NotificationDto } from "../../types";
import { NOTIFICATIONS_PATH } from "../../constants";

const postNotification = (notification: NotificationDto) => {
  return api.post<never, NotificationDto>(NOTIFICATIONS_PATH, notification);
};

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: postNotification,
    onError: (error) => {
      console.error("Error creating notification:", error);
    },
  });
};
