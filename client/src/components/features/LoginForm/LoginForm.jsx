import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "/src/redux/auth";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginName: "",
    loginPassword: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();

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
        login({ login: formData.loginName, password: formData.loginPassword })
      );
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className="text-center mb-4">Login to AdMarket</h2>
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
        <div className="mb-3 form-check">
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
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
