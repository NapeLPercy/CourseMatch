import { useAuth } from "../../context/AuthContext";
import Workspace from "../workspace/Workspace";
import NavLayout from "./NavLayout";

export default function AppNavigationLayout() {
  const { user } = useAuth();

  const authenticatedRoles = ["STUDENT", "ADMIN", "TUTOR", "PARENT"];

  const isAuthenticatedUser = authenticatedRoles.includes(user?.role);

  return isAuthenticatedUser ? <Workspace /> : <NavLayout />;
}
