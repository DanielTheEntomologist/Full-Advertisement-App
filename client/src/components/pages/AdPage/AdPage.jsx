import React, { useState } from "react";
import clsx from "clsx";
import styles from "./AdPage.module.scss";

import { NavLink, useLocation } from "react-router-dom";

import AdForm from "../../features/AdForm/AdForm";
import Ad from "../../features/Ad/Ad";

const AdPage = () => {
  const location = useLocation();

  // const [activeTab, setActiveTab] = useState(
  //   location.pathname === "/register" ? "register" : "login"
  // );

  const activeTab = location.pathname === "/register" ? "register" : "login";

  return (
    <section className="container" id="adPage">
      This is an AdPage
      <Ad />
      <AdForm />
    </section>
  );
};

export default AdPage;
