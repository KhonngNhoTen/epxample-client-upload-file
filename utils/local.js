const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const multer = require("multer");
const uuid = require("uuid").v4;
class LocalUpload {
  constructor(config) {
    if (!config.path || !fs.existsSync(config.path))
      throw new Error("Path not exists");
    this.path = config.path;
    this.memoryStorage = multer.memoryStorage();
    // this.diskStorage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, config.path);
    //   },
    //   filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //     cb(null, uniqueSuffix + "_" + file.fieldname);
    //   },
    // });
    this.memory = multer({ storage: this.memoryStorage });
  }
}

const uploadImageMiddleware = (config, client) => {
  return [
    client.memory.single(config.fieldName),
    async (req, res, next) => {
      if (req.file) {
        const _uuid = uuid();
        const buffer = await sharp(req.file.buffer)
          .resize(720)
          .jpeg()
          .toFile(client.path + "/" + _uuid + ".jpeg")
          .then(res.json({ filename: _uuid + ".jpeg" }));
      } else {
        res.json({ massage: "Please choose file to upload" });
      }
    },
  ];
};

/// CO THE LAY LINK
const getFileMiddleware = (config, client) => async (req, res, next) => {
  try {
    const name = req.query.name;
    const _path = path.join(client.path, "./", name);
    res.json({ path: _path });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  LocalUpload,
  uploadImageMiddleware,
  getFileMiddleware,
};
