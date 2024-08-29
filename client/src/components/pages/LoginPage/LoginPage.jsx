import React from "react";

import clsx from "clsx";
import { Row, Col, Container } from "reactstrap";

import styles from "./LoginPage.module.scss";

const API_URL = "http://localhost:5000";

const LoginPage = ({}) => (
  <section id="login-page" className="container">
    This is the login page
    <div className={clsx("row justify-content-center", styles.formBody)}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                  aria-controls="login"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="register-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#register"
                  type="button"
                  role="tab"
                  aria-controls="register"
                  aria-selected="false"
                >
                  Register
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <h2 className="text-center mb-4">Login to DreamScape</h2>
                <form action={API_URL + "/auth/login"} method="POST">
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
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
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
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
              <div
                className="tab-pane fade"
                id="register"
                role="tabpanel"
                aria-labelledby="register-tab"
              >
                <h2 className="text-center mb-4">Join DreamScape</h2>
                <form action={API_URL + "/auth/register"} method="POST">
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
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
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="registerConfirmPassword"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerConfirmPassword"
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LoginPage;
