import WorkspaceLayout from "./WorkspaceLayout";
import { NAV_CONFIG } from "../../Utils/textData/menuConfig";
import { useAuth } from "../../context/AuthContext";

export default function Workspace() {
  const { user, logout } = useAuth();

  const roleNavigation = {
    STUDENT: NAV_CONFIG.student,
    ADMIN: NAV_CONFIG.admin,
    TUTOR: NAV_CONFIG.tutor,
    PARENT: NAV_CONFIG.parent,
  };

  const navigation = roleNavigation[user?.role];

  if (!navigation) return null;

  return (
    <WorkspaceLayout
      navigation={navigation}
      user={user}
      onLogout={logout}
    />
  );
}
