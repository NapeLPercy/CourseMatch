import { api } from "../services/api";

export async function addProspectus(prospectus) {
  return await api.post(`/api/prospectus`, prospectus);
}
export async function downloadProspectus(uniCode) {
  return await api.get(`/api/prospectus/${uniCode}`, {
    responseType: "blob",
  });
}

export async function deleteProspectus(uniCode) {
  return await api.delete(`/api/prospectus/${uniCode}`);
}
