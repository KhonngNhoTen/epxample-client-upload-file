require("dotenv").config();

const env = {
  port: parseInt(process.env.PORT),
  upload_type: process.env.CLOUD_TYPE,
  accessKey: process.env.ACCESS_KEY,
  serectKey: process.env.SECRECT_KEY,
  endPoint: process.env.END_POINT,
  bulketName: process.env.BULKET_NAME,
};

module.exports = env;
