const Ad = require("../models/Ad.model");

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return match;
    }
  });
}

/****** SUBMIT AD ********/

exports.add = async (req, res) => {
  try {
    let { title, author, email } = req.fields;
    const file = req.files.file;

    // escape characters that could be used in HTML injection
    title = escapeHTML(title);
    author = escapeHTML(author);
    email = escapeHTML(email);

    switch (true) {
      case title == null:
        throw new Error("No title!");
      case author == null:
        throw new Error("No author!");
      case email == null:
        throw new Error("No email!");
      case title.length < 1:
        throw new Error("Title is too short!");
      case title.length > 25:
        throw new Error("Title is too long!");
      case author.length < 1:
        throw new Error("Author is too short!");
      case author.length > 50:
        throw new Error("Author is too long!");
      case !/^[0-9a-zA-Z._-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/.test(email):
        throw new Error("Wrong email address!");
      case !file:
        throw new Error("No file!");
      case file.size > 1048576:
        throw new Error("File is too large!");
      case !file.type.includes("image"):
        throw new Error("Wrong file format!");
      case !file.name.match(/\.(jpg|png|gif)$/):
        throw new Error("Wrong file format!");
      default: {
        const fileName = file.path.split("/").slice(-1)[0]; // cut only filename from full path, e.g. C:/test/abc.jpg -> abc.jpg
        const newPhoto = new Photo({
          title,
          author,
          email,
          src: fileName,
          votes: 0,
        });
        await newPhoto.save(); // ...save new photo in DB
        res.json(newPhoto);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

/****** LOAD ALL ADS ********/

exports.loadAll = async (req, res) => {
  try {
    res.status(200).json(await Ad.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET /ads – który zwróci wszystkie ogłoszenia,
exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting all ads");
  }
};
// GET /ads/:id – który zwróci konkretne ogłoszenie,
exports.get = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting ad");
  }
};

// POST /api/ads – do dodawania nowego ogłoszenia,
exports.add = async (req, res) => {
  try {
    console.log("ad.add");
    res.status(200).json({ message: "ad.add not implemented yet" });
    // const { title, description, author, price, phone, email } = req.body;
    // const newAd = new Ad({
    //   title,
    //   description,
    //   author,
    //   price,
    //   phone,
    //   email,
    // });
    // await newAd.save();
    // res.status(200).json(newAd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with adding ad" });
  }
};

// DELETE /api/ads/:id – do usuwania ogłoszenia,
exports.delete = async (req, res) => {
  try {
    const adId = res.params.id;
    console.log("ad.delete on adId", adId);
    res.status(200).json({ message: "ad.delete not implemented yet" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with deleting ad" });
  }
};

// PUT lub PATCH /api/ads/:id – do edycji ogłoszenia,
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
