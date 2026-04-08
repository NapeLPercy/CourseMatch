import {api} from "./api";

export async function guestGetAllQualifications(subjects) {
  const res = await api.post("/api/guest",{subjects});
  return res;
}
