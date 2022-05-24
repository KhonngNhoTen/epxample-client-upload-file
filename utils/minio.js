const Minio = require("minio");
const multer = require("multer");
const env = require("../../L-xay-dung-khung-api/src/configs/env");
const storage = multer.memoryStorage();
const uploadMulter = multer({ storage: storage });

//// CREATE Minio Client
const minio = new Minio.Client({
  endPoint: env.minio.ENDPOINT,
  port: env.minio.PORT,
  accessKey: env.minio.ACCESSKEY,
  secretKey: env.minio.SERECTKEY,
  useSSL: false,
});

//// GET FILE TO MINIO CLOUD
const getFile = async (filename) => {
  try {
    const file = await minio.getObject(env.minio.BUCKET_NAME, filename);
    return file;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//// UPLOAD FILE FROM MINIO CLOUD
const upload = async (filename, buffer) => {
  try {
    const rs = await minio.putObject("linh-test", filename, buffer, 300000);
    return rs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const uploadMiddleware = [
  uploadMulter.single("file"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const name = Date.now() + "_" + req.file.originalname;
        const rs = await upload(name, req.file.buffer, 3000000);
        res.json({ name });
      } else {
        res.send("Please choose file to upload");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
];

const getFileMiddleware = async (req, res, next) => {
  try {
    const name = req.query.name;
    const fileStream = await getFile(name);
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { uploadMiddleware, getFileMiddleware };
