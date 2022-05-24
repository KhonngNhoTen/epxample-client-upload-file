const TYPE = {
  minio: "minio",
  aws: "aws",
  locals: "local",
};

module.exports = (type) => {
  if (type === TYPE.minio) {
    const minio = require("../utils/minio");
    return minio;
  } else if (type === TYPE.aws) {
  } else if (type === TYPE.locals) {
    return require("./local");
  } else {
    throw new Error("TYPE INVALID");
  }
};
