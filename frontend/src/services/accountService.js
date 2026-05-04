import { api, handleApiError } from "./api";

export async function register(form) {
  const res = await api.post(`/api/auth/register`, form);
  return res;
}

export async function userLogin(form) {
  const res = await api.post(`/api/auth/login`, form);
  return res;
}

export async function requestResetPassword(email) {
  const res = await api.post(`/api/auth/request-reset`, { email });
  return res;
}

export async function resetPassword(token, password) {
  const res = await api.post(`/api/auth/reset`, { token, password });
  return res;
}


export async function getAllAccounts() {
  const res = await api.get(`/api/auth/accounts`);
  return res;
}

