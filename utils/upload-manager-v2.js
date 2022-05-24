const createClientUpload = require("./create-client-upload");
const genUploadMiddleware = require("./get-middlewares-upload");
/*
  configs must contain list field: 
  {
    fieldName,
    type,
    bulketName,
    accessKey,
    secrectKey,
    endPoint,
    port,
  }
*/

const arraySize = [
  [1280, 720],
  [480, 720],
];
const UploadManager = (config) => {
  try {
    config.arraySize = arraySize;
    const client = createClientUpload(config);
    const managerUploadMiddleware = genUploadMiddleware(config.type);

    function uploadImageMiddleware() {
      return managerUploadMiddleware.uploadImageMiddleware(config, client);
    }

    function getFileMiddleWare() {
      return managerUploadMiddleware.getFileMiddleware(config, client);
    }

    return {
      uploadImageMiddleware,
      getFileMiddleWare,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = UploadManager;
