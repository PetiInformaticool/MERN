import React from "react";
import { isLoggedIn } from "../utils";
import { Navigate } from "react-router-dom";

const PublicRoute = React.memo(({component: Component}) => (
  !isLoggedIn() ? <Component/> : <Navigate to="/" />
));

export default PublicRoute;
