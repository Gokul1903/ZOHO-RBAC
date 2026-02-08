import RequirePermission from "../auth/RequirePermission";
import { useAuth } from "../auth/AuthContext";

const Navbar = ({ onOpenUser, onOpenRole, onOpenPermission }) => {
  const { logout } = useAuth();
  
  return (
    <nav className="navbar navbar-zoho  sticky-top">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start mb-2 mb-md-0">
            <span className="navbar-brand fw-bold d-flex align-items-center">
              <img
                src="/zoho-logo-web.svg"
                alt="Zoho Logo"
                style={{ height: "24px", marginRight: "8px" }}
              />
              Zoho RBAC
            </span>
          </div>

          
          <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-end gap-2">
            <RequirePermission permission="manage_roles">
              <button
                className="btn btn-sm btn-zoho-outline-success"
                onClick={onOpenUser}
              >
                + User
              </button>

              <button
                className="btn btn-sm btn-zoho-outline-primary"
                onClick={onOpenRole}
              >
                + Role
              </button>

              <button
                className="btn btn-sm btn-zoho-outline-warning"
                onClick={onOpenPermission}
              >
                +Permissions
              </button>
            </RequirePermission>

            <button
              className="btn btn-sm btn-zoho-outline-danger ms-md-3"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;