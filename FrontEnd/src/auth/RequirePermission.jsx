import { useAuth } from "./AuthContext";

const RequirePermission = ({ permission, children }) => {
  const { user } = useAuth();

  if (!user) return null;
  if (!user.permissions.includes(permission)) return null;

  return children;
};

export default RequirePermission;