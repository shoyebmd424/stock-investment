import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/authenticationHelper";

const PrivateRoute = ({ children }) => {

    const isAuthenticated=getAuth()?.token;
    // const isAuthenticated=true;
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
