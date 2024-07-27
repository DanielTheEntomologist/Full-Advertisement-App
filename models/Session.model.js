const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  expires: { type: Date, required: true },
  session: { type: String, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);

// example of session document from mongoDB
// {
//     "_id": "F0Gsd51P-AuiTiGZy7P6hsTILaSkfrs4",
//     "expires": {
//       "$date": "2024-08-10T19:19:55.589Z"
//     },
//     "session": "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"_id\":\"66a1521892833f1d88536e67\",\"login\":\"testUser3\",\"password\":\"$2b$10$Tll/FgxP2TvdsvosWXxycu3xuoNhr4X1e0dhdmE8z7rKVCKH23UpK\",\"avatar\":\"img.jpg\",\"phone\":\"+48 506 193 214\",\"salt\":\"$2b$10$Tll/FgxP2TvdsvosWXxycu\",\"__v\":0}}"
// }

// session object deserialized from the above document
// const exampleSession = {
//   cookie: { originalMaxAge: null, expires: null, httpOnly: true, path: "/" },
//   user: {
//     _id: "66a1521892833f1d88536e67",
//     login: "testUser3",
//     password: "$2b$10$Tll/FgxP2TvdsvosWXxycu3xuoNhr4X1e0dhdmE8z7rKVCKH23UpK",
//     avatar: "img.jpg",
//     phone: "+48 506 193 214",
//     salt: "$2b$10$Tll/FgxP2TvdsvosWXxycu",
//     __v: 0,
//   },
// };

// const devUser = {
//   _id: "66a1521892833f1d88536e67",
//   login: "DevUser1",
//   password: "SuperSecretPassword",
//   avatar: "img.jpg",
//   phone: "+999 999 999 999",
//   salt: "",
//   __v: 0,
// };
