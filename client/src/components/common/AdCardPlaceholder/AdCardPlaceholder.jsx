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
import styles from "./AdCardPlaceholder.module.scss";

const exampleAd = {
  id: "loading",
  title: "Loading Title",
  description:
    "Loading Description Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  image: "",
  category: "",
  location: "loading location",
  locationCoords: [0, 0],
  contact: "loading mail address",
  seller: "loading seller",
};

const AdCardPlaceholder = ({}) => {
  const ad = exampleAd;
  return (
    <div data-category={ad.category}>
      <Card className={styles.card}>
        <Placeholder
          tag="div"
          color="primary"
          animation="glow"
          top
          width="100%"
          className={styles.adImage}
        ></Placeholder>
        {/* <CardImg
          top
          width="100%"
          src={ad.image}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback image also fails
            // e.target.src = "path/to/fallback-image.jpg"; // Set fallback image URL
          }}
          className={styles.adImage}
        /> */}
        <CardBody className={styles.cardBody}>
          <h3 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h3>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>

          <h5 className="text-muted placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
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
};

export default AdCardPlaceholder;
