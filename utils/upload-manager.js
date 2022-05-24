const UploadManager = (clientUpload) => {
  let clientUpload = clientUpload;

  function upload(options) {
    return handleUpload.uploadMiddleware(options);
  }

  function getFile(options) {
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
  minio: "minio",
  aws: "aws",
  locals: "local",
};

module.exports = {
  UploadManager,
  TYPE,
};
