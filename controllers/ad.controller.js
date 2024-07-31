const Ad = require("../models/Ad.model");

const { deleteFile } = require("../utils/deleteFile");

exports.add = async (req, res) => {
  let image = "";
  try {
    const { title, content, date, price, location, seller } = req.body;
    image = req.file ? req.file.path : "";

    if (await Ad.findOne({ title: title, seller: seller })) {
      res.status(409).json({
        message:
          "Ad with title " + title + " by user " + seller + " already exists",
      });
      await deleteFile(image);
      return;
    }

    const newAd = await new Ad({
      title: title,
      content: content,
      date: date,
      image: image,
      price: price,

      location: location,
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
    console.log("ad.delete on adId", adId);

    const ad = await Ad.findById(adId);

    if (!ad) {
      res.status(404).json({ message: "ad not found" });
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
  try {
    const adId = res.params.id;
    console.log("ad.update on adId", adId);
    res.status(200).json({ message: "ad.update not implemented yet" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with updating ad" });
  }
};

exports.search = async (req, res) => {
  try {
    console.log("ad.search");
    res.status(200).json({ message: "ad.search not implemented yet" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with searching ad" });
  }
};
