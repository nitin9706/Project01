import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./apiFetcher.js";

// Normalize server responses where some endpoints return { success, data } and others return direct payloads
const unwrap = (res) => res?.data ?? res?.user ?? res ?? null;

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosClient.post("/user/refreshAccessToken");
      return unwrap(res);
    },
    retry: false,
    ...options,
  });
}

export function useAllDeployments(options = {}) {
  return useQuery({
    queryKey: ["deployments"],
    queryFn: async () => {
      const res = await axiosClient.get("/clone/getAllProjects");
      return unwrap(res);
    },
    ...options,
  });
}

export function useDeployment(id, options = {}) {
  return useQuery({
    queryKey: ["deployment", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axiosClient.get(`/clone/getProject/${id}`);
      return unwrap(res);
    },
    enabled: !!id,
    ...options,
  });
}

export function useCreateDeployment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosClient.post("/clone/createClone", payload);
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deployments"] }),
  });
}

export function useDeleteDeployment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosClient.delete(`/clone/deleteProject/${id}`);
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deployments"] }),
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (creds) => {
      const res = await axiosClient.post("/user/login", creds);
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axiosClient.post("/user/register", payload);
      return res;
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.post("/user/logout");
      return res;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}
