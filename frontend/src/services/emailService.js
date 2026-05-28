import {api} from "./api";

export async function sendEmail(data) {
  const res = await api.post(`/api/email/send`, data);
  return res;
}