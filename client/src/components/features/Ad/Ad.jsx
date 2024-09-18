import { Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

import { addMultiple, selectAdById, sellectAllAds } from "../../../redux/ads";
import { useDispatch, useSelector } from "react-redux"; // Import from @reduxjs/toolkit

import { fetchAds } from "../../../redux/ads";

// import styles from "./ExplorePage.module.scss";

import AdCard from "../../common/AdCard/AdCard";

import SearchCategories from "../../common/SearchCategories/SearchCategories";
import { nanoid } from "@reduxjs/toolkit";

const Ad = () => {
  return (
    <section id="explore-page" className="container">
      This is an Ad display
    </section>
  );
};

export default Ad;
