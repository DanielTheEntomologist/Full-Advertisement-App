import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import styles from "./AdCard.module.scss";

const AdCard = ({ ad }) => (
  <div data-category={ad.category}>
    <Card className={styles.card}>
      <CardImg
        top
        width="100%"
        src={ad.image}
        alt={ad.title}
        className={styles.adImage}
      />
      <CardBody className={styles.cardBody}>
        <CardTitle tag="h5">{ad.title}</CardTitle>
        <CardText>{ad.description}</CardText>
        <CardText>
          <small className="text-muted">Category: {ad.category}</small>
        </CardText>
        {/* <Button
        className={styles.btn}
        href={`mailto:${ad.contact}`}
        color="primary"
      >
        Contact
      </Button> */}
      </CardBody>
    </Card>
  </div>
);

export default AdCard;
