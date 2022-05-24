const path = require("path");
const app = require("express")();
const minioUpload = require("./utils/upload-manager-v2")({
  type: "minio",
  accessKey: "hoailinh",
  secretKey: "976431a@",
  endPoint: "lubrytics.com",
  port: 9900,
  bulketName: "linh-test",
  fieldName: "file",
});
app.post(
  "/file",
  minioUpload.uploadImageMiddleware(),
  (name, req, res, next) => {
    res.json({ name });
  }
);
app.get("/file", minioUpload.getFileMiddleWare());

/**
 *
 *
 *
 *
 */
const localUpload = require("./utils/upload-manager-v2")({
  fieldName: "file",
  path: path.join(__dirname, "./uploads"),
  type: "local",
});
app.post(
  "/file-locals",
  localUpload.uploadImageMiddleware(),
  (filename, req, res, next) => {
    res.json({ filename });
  }
);
app.get("/file-locals", localUpload.getFileMiddleWare());
/**
 *
 *
 *
 *
 */
app.listen(3200, () => {
  console.log("Sever start at port " + 3200);
});
