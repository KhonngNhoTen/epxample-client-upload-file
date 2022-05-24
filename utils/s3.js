const Aws = require("aws-sdk");
const s3 = new Aws.S3({
  accessKeyId: "hoailinh",
  secretAccessKey: "976431a@",
  endpoint: "lubrytics.com:9900",
});

module.exports = s3;
