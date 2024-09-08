import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
    agreeTerms: false,
  });

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
      // Handle registration logic
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2 className="text-center mb-4">Join DreamScape</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="registerName"
            name="registerName"
            value={formData.registerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            name="registerEmail"
            value={formData.registerEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="registerPassword"
            value={formData.registerPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="registerConfirmPassword"
            name="registerConfirmPassword"
            value={formData.registerConfirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label" htmlFor="agreeTerms">
            I agree to the{" "}
            <a href="https://realm-of-imagination.net/terms">
              Terms and Conditions
            </a>
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
