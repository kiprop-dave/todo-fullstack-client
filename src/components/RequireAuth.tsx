import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function RequireAuth() {
  const context = useContext(AuthContext);
  if (!context) return null;
  const { auth } = context;
  const location = useLocation();

  return (
    <>
      {auth.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace={true} />
      )}
    </>
  );
}
export default RequireAuth;
