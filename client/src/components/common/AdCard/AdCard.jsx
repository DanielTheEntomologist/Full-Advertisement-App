import React from "react";

import "./AdCard.scss";

const AdCard = ({ ad }) => (
  <div className="col">
    <div className="card h-100" data-category="${ad.category}">
      <img
        src={ad.image}
        className="card-img-top ad-image"
        alt={ad.title}
        width="400"
        height="200"
      />
      <div className="card-body">
        <h5 className="card-title">{ad.title}</h5>
        <p className="card-text">{ad.description}</p>
        <p className="card-text">
          <small className="text-muted">Category: {ad.category}</small>
        </p>
        <a href={`mailto:${ad.contact}`} className="btn btn-primary">
          Contact
        </a>
      </div>
    </div>
  </div>
);

export default AdCard;
