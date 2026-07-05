import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store/hooks";

import { authActions } from "../store/auth.slice";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useCallback(() => {
    dispatch(authActions.logout());
    queryClient.clear();
    navigate("/login", { replace: true });
  }, [dispatch, navigate, queryClient]);
}
