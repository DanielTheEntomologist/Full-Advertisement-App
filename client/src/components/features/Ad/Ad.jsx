import { Col, Row, Spinner } from "reactstrap";
import { useState, useEffect } from "react";

import {
  addMultiple,
  selectAdById,
  sellectAllAds,
  selectFirst,
} from "../../../redux/ads";
import { usersRedux } from "../../../redux/users";
import { fetchUserById } from "../../../redux/users";
import { useDispatch, useSelector } from "react-redux"; // Import from @reduxjs/toolkit
import { NavLink, useLocation, useParams } from "react-router-dom";

import { fetchAdById } from "../../../redux/ads";

// import styles from "./ExplorePage.module.scss";

import AdCard from "../../common/AdCard/AdCard";

import SearchCategories from "../../common/SearchCategories/SearchCategories";
import { nanoid } from "@reduxjs/toolkit";

const Ad = () => {
  const params = useParams();
  const adId = params.id;

  const dispatch = useDispatch();

  const ad = useSelector((state) => selectAdById(state, adId));
  const userId = ad ? ad.seller : undefined;
  const user = useSelector((state) =>
    usersRedux.selectors.selectById(state, userId)
  );

  useEffect(() => {
    if (userId && !user) dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (adId && !ad) dispatch(fetchAdById(adId));
    return () => {};
  }, [dispatch, adId]);

  let adContent = (
    <div className="card mb-4">
      <Spinner /> Loading Your Ad...
    </div>
  );
  let locationContent = (
    <div>
      <Spinner />

      <p className="card-text">Loading Your Ad...</p>
    </div>
  );

  if (ad) {
    adContent = (
      <div className="card mb-4">
        <img src={ad.image} className="card-img-top ad-image" alt={ad.title} />
        <div className="card-body">
          <h1 className="card-title">{ad.title}</h1>
          <p className="card-text">{ad.description}</p>
          <p className="card-text">
            <small className="text-muted">Category: {ad.category}</small>
          </p>
        </div>
      </div>
    );
    locationContent = ad.location;
  }

  let userContent = (
    <div>
      <Spinner />
      <p className="card-text">Loading Contact Information...</p>
    </div>
  );
  if (user) {
    userContent = (
      <div className="card-body">
        <h5 className="card-title">Contact Information</h5>
        <div className="card-text">
          <div>
            <strong>Name:</strong> {user.login}
          </div>
          <div>
            <strong>Email:</strong>{" "}
          </div>
          <div>
            <a href={`mailto:${user.mail}`}>{user.mail}</a>
          </div>
          <div>
            <strong>Phone:</strong> {user.phone}
          </div>
        </div>
        <a href={`mailto:${user.mail}`} className="btn btn-primary w-100 mb-2">
          Send Email
        </a>
        <a href={`tel:${user.phone}`} className="btn btn-outline-primary w-100">
          Call Now
        </a>
      </div>
    );
  }

  return (
    <section id="explore-page" className="container">
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">{adContent}</div>
          <div className="col-lg-4">
            <div className="card mb-4">{userContent}</div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                {locationContent}
                {/* <div id="map" className="map-container"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ad;
