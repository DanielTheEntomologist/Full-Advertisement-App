const { unlink } = require("node:fs/promises");

exports.deleteFile = async function (path) {
  try {
    await unlink(path);
    // console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
};
