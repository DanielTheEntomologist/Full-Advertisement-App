import { Col, Row, Spinner } from "reactstrap";
import { useState, useEffect } from "react";

import {
  addMultiple,
  selectAdById,
  sellectAllAds,
  selectFirst,
} from "../../../redux/ads";
import { useDispatch, useSelector } from "react-redux"; // Import from @reduxjs/toolkit

import { fetchAds } from "../../../redux/ads";

// import styles from "./ExplorePage.module.scss";

import AdCard from "../../common/AdCard/AdCard";

import SearchCategories from "../../common/SearchCategories/SearchCategories";
import { nanoid } from "@reduxjs/toolkit";

const Ad = () => {
  const dispatch = useDispatch();

  const ad = useSelector(selectFirst);

  useEffect(() => {
    dispatch(fetchAds());
    return () => {};
  }, [dispatch]);

  console.log("ad", ad);
  if (!ad) {
    return (
      <div>
        <Spinner /> Loading Your Ad...
      </div>
    );
  }

  return (
    <section id="explore-page" className="container">
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <img
                src={ad.image}
                className="card-img-top ad-image"
                alt={ad.title}
              />
              <div className="card-body">
                <h1 className="card-title">{ad.title}</h1>
                <p className="card-text">{ad.description}</p>
                <p className="card-text">
                  <small className="text-muted">Category: {ad.category}</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Contact Information</h5>
                <p className="card-text">
                  <strong>Name:</strong> John Smith
                  <strong>Email:</strong>{" "}
                  <a href="mailto:john@handyman.com">john@handyman.com</a>
                  <strong>Phone:</strong> (555) 123-4567
                  <strong>Location:</strong> New York City, NY
                </p>
                <a
                  href="mailto:john@handyman.com"
                  className="btn btn-primary w-100 mb-2"
                >
                  Send Email
                </a>
                <a
                  href="tel:+15551234567"
                  className="btn btn-outline-primary w-100"
                >
                  Call Now
                </a>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">{ad.location}</p>
                {/* <div id="map" className="map-container"></div> */}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Leave a Review</h5>
                <form id="reviewForm">
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                      Rating
                    </label>
                    <select className="form-select" id="rating" required>
                      <option value="">Select a rating</option>
                      <option value="5">5 stars</option>
                      <option value="4">4 stars</option>
                      <option value="3">3 stars</option>
                      <option value="2">2 stars</option>
                      <option value="1">1 star</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                      Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ad;
