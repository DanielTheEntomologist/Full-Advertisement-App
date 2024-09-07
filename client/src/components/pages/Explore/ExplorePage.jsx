import React from "react";

import { Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

import { addMultiple, selectAdById, sellectAllAds } from "../../../redux/ads";
import { useDispatch, useSelector } from "react-redux"; // Import from @reduxjs/toolkit

import { fetchAds } from "../../../redux/ads";

// import styles from "./ExplorePage.module.scss";

import AdCard from "../../common/AdCard/AdCard";

import SearchCategories from "../../common/SearchCategories/SearchCategories";
import { nanoid } from "@reduxjs/toolkit";

const ExplorePage = ({}) => {
  // const [ads, setAds] = useState([{}, {}, {}, {}]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const allAds = useSelector((state) => sellectAllAds(state));

  let ads = [{}, {}, {}, {}];
  if (allAds.length > 0) {
    ads = allAds;
  }

  useEffect(() => {
    console.log("Loading ads...");
    dispatch(fetchAds());

    setLoading(false);

    return () => {};
  }, []);

  // const dummyAds = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., 10]
  // let content = (
  //   <Row>
  //     {dummyAds.map((id) => (
  //       <Col xs={12} sm={6} md={4} lg={3} key={"loading" + id} className="my-2">
  //         <AdCard loading={true} />
  //       </Col>
  //     ))}
  //   </Row>
  // );

  const content = (
    <Row>
      {ads.map((ad) => (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={ad.id ? ad.id : "placeholder" + nanoid()}
          className="my-2"
        >
          <AdCard ad={ad} loading={loading} />
        </Col>
      ))}
    </Row>
  );

  return (
    <section id="explore-page" className="container">
      <SearchCategories />
      {content}
    </section>
  );
};

export default ExplorePage;
