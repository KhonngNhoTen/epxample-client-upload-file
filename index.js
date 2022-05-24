const app = require("express")();
const { UploadManager, TYPE } = require("./utils/upload");
const upload = UploadManager({
  type: TYPE.minio,
});
app.post("/file", upload.upload(), (req, res, next) => {
  res.send("Ok");
});
app.get("/file", upload.getFile());

app.listen(3100, () => {
  console.log("Sever start at port " + 3100);
});
