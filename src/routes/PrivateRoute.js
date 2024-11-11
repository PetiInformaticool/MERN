import React from "react";
import { isLoggedIn } from "../utils";
import NotFound from "../pages/NotFound";

const PrivateRoute = React.memo(({component: Component}) => (
  isLoggedIn() ? <Component/> : <NotFound/>
));

export default PrivateRoute;
