import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Placeholder,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import styles from "./AdCard.module.scss";

const imgPlaceholder = () => (
  <Placeholder
    tag="div"
    color="secondary"
    animation="glow"
    width="100%"
    className={styles.adImage}
  ></Placeholder>
);

const cardImageCreator = ({ ad }) => (
  <CardImg
    top
    width="100%"
    src={ad.image}
    alt={ad.title}
    className={styles.adImage}
  />
);

const bodyPlaceholder = () => (
  <CardBody className={styles.cardBody}>
    <h3 className="card-title placeholder-glow">
      <span className="placeholder col-6"></span>
    </h3>
    <p className="card-text placeholder-glow">
      <span className="placeholder col-7"></span>
      <span> </span>
      <span className="placeholder col-4"></span>
      <span> </span>
      <span className="placeholder col-4"></span>
      <span> </span>
      <span className="placeholder col-6"></span>
      <span> </span>
      <span className="placeholder col-8"></span>
      <span> </span>
    </p>
    <h5 className="text-muted placeholder-glow">
      <span className="placeholder col-6"></span>
    </h5>
  </CardBody>
);

const cardBodyCreator = ({ ad }) => (
  <CardBody className={styles.cardBody}>
    <CardTitle tag="h5">{ad.title}</CardTitle>
    <CardText>{ad.description}</CardText>
    <CardText>
      <small className="text-muted">Category: {ad.category}</small>
    </CardText>
  </CardBody>
);

const AdCard = ({ ad, loading }) => {
  let cardImage;
  let cardBody;
  if (loading) {
    cardImage = imgPlaceholder();
    cardBody = bodyPlaceholder();
  } else {
    cardImage = cardImageCreator({ ad });
    cardBody = cardBodyCreator({ ad });
  }

  return (
    <NavLink
      data-category={ad ? ad.category : "loading"}
      to={"ads/" + ad ? ad.id : ""}
      style={{
        all: "unset",
      }}
    >
      <Card className={styles.card}>
        {cardImage}
        {cardBody}
      </Card>
    </NavLink>
  );
};

export default AdCard;
