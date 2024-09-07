import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/api";

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { logout, isLogoutPending };
};
