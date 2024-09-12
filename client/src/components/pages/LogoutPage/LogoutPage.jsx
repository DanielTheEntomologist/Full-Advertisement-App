import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  pendingAction,
  loginStatus,
  logoutError,
} from "/src/redux/auth";
import { Button, Spinner } from "reactstrap";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const action = useSelector(pendingAction);
  const status = useSelector(loginStatus);
  const errorMessage = useSelector(logoutError);

  if (action === null && status === "authorized") {
    return (
      <div>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Button onClick={() => dispatch(logout())}>Confirm Logout</Button>
      </div>
    );
  }

  if (action === "logout" && status === "authorized") {
    return (
      <div>
        <Spinner />
        Logging You out...
      </div>
    );
  }

  if (action === null && status === "unauthorized") {
    return <div>You have been logged out</div>;
  }

  return null;
};

export default LogoutPage;
