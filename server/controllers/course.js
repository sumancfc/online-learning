const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

exports.imageUploadToAWS = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) return res.status(400).json({ error: "No Image Found" });

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    const params = {
      Bucket: "online-learning-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload image to aws s3
    S3.upload(params, (err, data) => {
      if (err) {
        return res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Upload Image. Try Again" });
  }
};

exports.imageRemoveFromAWS = async (req, res) => {
  try {
    const { image } = req.body;

    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    // send remove request to s3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Remove Image. Try Again" });
  }
};
