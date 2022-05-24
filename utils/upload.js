const UploadManager = (config) => {
  let handleUpload = genUploadManagerMiddleware(config.type);

  function upload() {
    return handleUpload.uploadMiddleware;
  }

  function getFile() {
    return handleUpload.getFileMiddleware;
  }

  return {
    upload,
    getFile,
  };
};

const genUploadManagerMiddleware = (type) => {
  if (type === TYPE.minio) {
    const minio = require("./minio");
    return minio;
  } else if (type === TYPE.aws) {
  } else if (type === TYPE.locals) {
  } else {
    throw new Error("TYPE INVALID");
  }
};

const TYPE = {
  minio: "MINIO",
  aws: "AWS",
  locals: "LOCAL",
};

module.exports = {
  UploadManager,
  TYPE,
};
