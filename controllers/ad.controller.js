const Ad = require("../models/Ad.model");

const { deleteFile } = require("../utils/deleteFile");

exports.add = async (req, res) => {
  let image = "";
  try {
    const { title, content, date, price, location, locationCoords, seller } =
      req.body;
    image = req.file ? req.file.path : "";

    if (seller !== req.session.user._id) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    if (await Ad.findOne({ title: title, seller: seller })) {
      res.status(409).json({
        message:
          "Ad with title " + title + " by user " + seller + " already exists",
      });
      await deleteFile(image);
      return;
    }

    const coordsParsed = JSON.parse(locationCoords);

    const newAd = await new Ad({
      title: title,
      content: content,
      date: date,
      image: image,
      price: price,

      location: location,
      locationCoords: coordsParsed,
      seller: seller,
    });

    await newAd.save();

    res.status(200).json({ message: "ad created" });
  } catch (err) {
    if (image) await deleteFile(image);
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting all ads");
  }
};

exports.get = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting ad");
  }
};

exports.delete = async (req, res) => {
  try {
    const adId = req.params.id;

    const ad = await Ad.findById(adId);

    if (!ad) {
      res.status(404).json({ message: "ad not found" });
      return;
    }
    if (ad.seller !== req.user._id) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    await ad.deleteOne();

    res.status(200).json({ message: "ad deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with deleting ad" });
  }
};

exports.update = async (req, res) => {
  // console.log("ad.update");
  // console.log(req.body);
  try {
    const adId = req.params.id;
    const ad = await Ad.findById(adId);

    // console.log("ad.update", ad);

    // check request validity
    if (!ad) {
      res.status(404).json({ message: "ad not found" });
      return;
    }
    if (ad.seller !== req.session.user._id) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    const image = req.file ? req.file.path : undefined;

    if (
      req.body.title &&
      (await Ad.findOne({ title: req.body.title, seller: ad.seller }))
    ) {
      res.status(409).json({
        message:
          "Ad with title " + title + " by user " + seller + " already exists",
      });
      await deleteFile(image);
      return;
    }

    // modify ad object
    ad.set(req.body);
    // console.log("req.body", req.body);

    if (req.body.locationCoords) {
      const coordsParsed = JSON.parse(req.body.locationCoords);
      ad.set({ locationCoords: coordsParsed });
    }

    if (image) {
      ad.set({ image: image });
    }

    console.log("ad.updated", ad);

    await ad.save();

    res.status(200).json({ message: "ad updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with updating ad" });
  }
};

exports.search = async (req, res) => {
  try {
    console.log("ad.search");
    console.log(req.params.searchPhrase);

    const searchPhrase = req.params.searchPhrase;
    // const regex = `\b(${searchPhrase})\b`; // whole word
    const regex = `(${searchPhrase})`;

    // title, content, date, price, location, seller;

    const ads = await Ad.find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { location: { $regex: regex } },
      ],
    });

    // const regexPattern = `\\b(${searchPhrase("|")})\\b`; // Create the regex pattern
    // const regex = new RegExp(regexPattern, "gi"); // Create the regex object

    res.status(200).json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with searching ad" });
  }
};
