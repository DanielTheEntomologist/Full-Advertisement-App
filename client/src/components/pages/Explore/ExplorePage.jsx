import React from "react";

import { Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

// import styles from "./ExplorePage.module.scss";

import mockAds from "../../common/AdCard/MockAds";
import AdCard from "../../common/AdCard/AdCard";
import AdCardPlaceholder from "../../common/AdCardPlaceholder/AdCardPlaceholder";
import SearchCategories from "../../common/SearchCategories/SearchCategories";

const ExplorePage = ({}) => {
  const [ads, setAds] = useState([
    { id: "placeholder1" },
    { id: "placeholder2" },
    { id: "placeholder3" },
    { id: "placeholder4" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Loading ads...");

      setLoading(false);
      setAds(mockAds);

      return () => clearTimeout(timeout);
    }, 2000);
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
        <Col xs={12} sm={6} md={4} lg={3} key={ad.id} className="my-2">
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
