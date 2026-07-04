import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store/hooks";

import { authService } from "../services/auth.service";
import { authActions } from "../store/auth.slice";

import type { LoginCredentials } from "../types/auth.types";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginCredentials) => authService.login(payload),
    onSuccess: (data) => {
      dispatch(authActions.setCredentials(data));
      navigate("/", { replace: true });
    },
  });
}
