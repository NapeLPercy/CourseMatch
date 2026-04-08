import { api, handleApiError } from "./api";

export async function register(form) {
  const res = await api.post(`/api/auth/register`, form);
  return res;
}

export async function userLogin(form) {
  const res = await api.post(`/api/auth/login`, form);
  return res;
}
