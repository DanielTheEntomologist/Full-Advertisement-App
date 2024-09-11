import React, { useState } from "react";
import clsx from "clsx";
import styles from "./LoginPage.module.scss";
import LoginForm from "../../features/LoginForm/LoginForm";
import RegisterForm from "../../features/RegisterForm/RegisterForm";
import { NavLink, useLocation } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();

  // const [activeTab, setActiveTab] = useState(
  //   location.pathname === "/register" ? "register" : "login"
  // );

  const activeTab = location.pathname === "/register" ? "register" : "login";

  return (
    <section id="login-page" className="container">
      <div className={clsx("row justify-content-center", styles.formBody)}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <button
                      className={clsx(
                        "nav-link",
                        activeTab === "login" ? "active" : ""
                      )}
                      id="login-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#login"
                      type="button"
                      role="tab"
                      aria-controls="login"
                      aria-selected="true"
                      onClick={() => {}}
                    >
                      Login
                    </button>
                  </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                  <NavLink to="/register" style={{ textDecoration: "none" }}>
                    <button
                      className={clsx(
                        "nav-link",
                        activeTab === "register" ? "active" : ""
                      )}
                      id="register-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#register"
                      type="button"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                      onClick={() => {}}
                    >
                      Register
                    </button>
                  </NavLink>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
