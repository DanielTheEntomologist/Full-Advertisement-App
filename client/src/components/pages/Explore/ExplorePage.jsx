import React from "react";

import { Row, Col } from "reactstrap";

// import styles from "./ExplorePage.module.scss";

import ads from "../../common/AdCard/MockAds";
import AdCard from "../../common/AdCard/AdCard";

const ExplorePage = ({}) => (
  <section id="explore-page" className="container">
    <Row>
      {ads.map((ad) => (
        <Col xs={12} sm={6} md={4} lg={3} key={ad.id} className="my-2">
          <AdCard ad={ad} />
        </Col>
      ))}
    </Row>
  </section>
);

export default ExplorePage;
