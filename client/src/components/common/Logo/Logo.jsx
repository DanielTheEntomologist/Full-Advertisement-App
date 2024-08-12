import React from "react";

import styles from "./Logo.module.scss";

const Logo = ({ src }) => <img src={src} className={styles.logo} />;

export default Logo;
