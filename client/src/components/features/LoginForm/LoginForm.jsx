import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginStatus,
  pendingAction,
  loginError,
} from "/src/redux/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginName: "",
    loginPassword: "",
    rememberMe: false,
  });

  const action = useSelector(pendingAction);
  const status = useSelector(loginStatus);
  const errorMessage = useSelector(loginError);

  const dispatch = useDispatch();

  if (action === null && status === "authorized") {
    return (
      <div>
        <FontAwesomeIcon icon={faCheck} />
        You are logged in!
      </div>
    );
  }

  if (action === "login" && status === "unauthorized") {
    return (
      <div>
        <Spinner />
        Logging You in...
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.reportValidity()) {
      dispatch(
        loginUser({
          login: formData.loginName,
          password: formData.loginPassword,
        })
      );
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className="text-center mb-4">Login to AdMarket</h2>
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginName" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            id="loginName"
            name="loginName"
            value={formData.loginName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            name="loginPassword"
            value={formData.loginPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
