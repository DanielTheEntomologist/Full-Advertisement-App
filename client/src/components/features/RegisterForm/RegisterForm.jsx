import React, { useState } from "react";
import styles from "./RegisterForm.module.scss";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/auth";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    registerName: "",
    registerEmail: "",
    avatarImage: "",
    registerPhone: "",
    registerPassword: "",
    registerConfirmPassword: "",
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // console.log(e.target);
    setFormData({
      ...formData,
      [name]: type === "file" && files.length > 0 ? files[0].name : value,
      // for some reason files[0] is undefined but files[0].name returns the File object
    });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.reportValidity()) {
      // Handle registration logic

      const payload = {
        login: formData.registerName,
        password: formData.registerPassword,
        avatar: formData.avatarImage,
        phone: formData.registerPhone,
        email: formData.registerEmail,
      };
      for (const key in payload) {
        if (!payload[key]) {
          delete payload[key];
        }
      }

      dispatch(registerUser(payload));
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2 className="text-center mb-4">Join DreamScape</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerName" className="form-label">
            Login Name
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
          <label htmlFor="avatarImage" className="form-label">
            Avatar Image
          </label>
          <input
            type="file"
            className="form-control"
            id="avatarImage"
            name="avatarImage"
            accept=".jpg,.jpeg,.png"
            onChange={handleInputChange}
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
