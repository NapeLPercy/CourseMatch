import { api, handleApiError } from "./api";

//decides the url endpoint based on role

export async function saveUserProfile(data) {
  const { role } = data;

  try {
    switch (role) {
      case "STUDENT":
        return await studentInitialData(data);
      case "PARENT":
        return await parentInitialData(data);
      case "TUTOR":
        return await tutorInitialData(data);
      default:
        return {
          success: false,
          message: "Error occured, try again later.",
        };
    }
  } catch (error) {
    return handleApiError("Error occured, try later", error);
  }
}
//student
async function studentInitialData(studentData) {
  const res = api.post(`/api/student/profile/basic`, { studentData });
  return res;
}
//parent
async function parentInitialData(parentData) {
  const res = await api.post(`/api/parent/profile`, { parentData });
  return res;
}
//tutor
async function tutorInitialData(tutorData) {
  const res = api.post(`/api/tutor/profile`, { tutorData });
  return res;
}
