import React, { useState } from "react";
import clsx from "clsx";
import styles from "./AdPage.module.scss";

import AdForm from "../../features/AdForm/AdForm";
import Ad from "../../features/Ad/Ad";

const AdPage = () => {
  return (
    <section className="container" id="adPage">
      This is an AdPage
      <Ad />
      <AdForm />
    </section>
  );
};

export default AdPage;
