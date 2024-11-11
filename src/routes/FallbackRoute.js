import React from "react";
import { isLoggedIn } from "../utils";

const FallbackRoute = ({component: Component, fallback: Fallback}) => (
  isLoggedIn() ? <Component/> : <Fallback/>
);

export default FallbackRoute;
