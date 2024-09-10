import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, pendingAction, loginStatus } from "/src/redux/auth";
import { Button } from "reactstrap";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const action = useSelector(pendingAction);
  const status = useSelector(loginStatus);

  if (action === null && status === "authorized") {
    return <Button onClick={() => dispatch(logout())}>Confirm Logout</Button>;
  }

  if (action === "logout" && status === "authorized") {
    return <div>Logging You out...</div>;
  }

  if (action === null && status === "unauthorized") {
    return <div>You have been logged out</div>;
  }

  return null;
};

export default LogoutPage;
