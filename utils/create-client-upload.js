const Minio = require("minio");
const TYPE = {
  minio: "minio",
  aws: "aws",
  locals: "local",
};

/*
  create client upload, include: 
  -  MinioClient
  -  AWS S3
  -  Locals
*/
const createClientUpload = (config) => {
  if (config.type === TYPE.minio) {
    const listField = {
      endPoint: config.endPoint,
      port: parseInt(config.port),
      accessKey: config.accessKey,
      secretKey: config.secretKey,
      useSSL: false,
    };
    return new Minio.Client(listField);
  } else if (config.type === TYPE.locals) {
    const LocalUpload = require("./local").LocalUpload;
    const listField = {
      path: config.path,
    };
    return new LocalUpload(listField);
  }

  throw new Error("Type client upload invalid");
};

module.exports = createClientUpload;
