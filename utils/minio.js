const multer = require("multer");
const storage = multer.memoryStorage();
const uploadMulter = multer({ storage: storage });
const sharp = require("sharp");
const uuid = require("uuid").v4;
//// GET FILE TO MINIO CLOUD
const getFile = async (config, minio, name, res) => {
  try {
    const file = await minio.getObject(config.bulketName, name);
    file.pipe(res);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//// UPLOAD FILE FROM MINIO CLOUD
const upload = async (config, minio, options) => {
  try {
    const rs = await minio.putObject(
      config.bulketName,
      options.name,
      options.buffer,
      options.size
    );
    console.log(rs);
    return rs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const uploadImageMiddleware = (config, client) => {
  return [
    uploadMulter.single(config.fieldName),
    async (req, res, next) => {
      try {
        if (req.file) {
          const size0 = [config.arraySize[0][0], config.arraySize[0][1]];
          const buffer = await sharp(req.file.buffer)
            .resize(size0[0], size0[1])
            .jpeg()
            .toBuffer();

          const name = uuid() + ".jpeg";
          const rs = await upload(config, client, {
            name,
            buffer,
            size: 5000000,
          });
          next(name);
        } else {
          res.send("Please choose file to upload");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  ];
};

const getFileMiddleware = (config, client) => async (req, res, next) => {
  try {
    const name = req.query.name;
    await getFile(config, client, name, res);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { uploadImageMiddleware, getFileMiddleware };
