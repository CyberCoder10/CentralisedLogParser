require('dotenv').config();

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

const uploadFile = (filePath, fileName) => {
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (error) => {
    console.log(`Error occurred while reading file: ${filePath}`, error);
  });

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  s3.upload(uploadParams, (error, data) => {
    if (error) {
      console.log(`Error occurred while uploading file: ${fileName}`, error);
    } else {
      console.log(`File uploaded successfully: ${fileName}`);
    }
  });
};

const files = [
  { name: 'country_1.json', path: './data/country_1.json' },
  { name: 'cars_1.json', path: './data/cars_1.json' },
  { name: 'personalities_1.json', path: './data/personalities_1.json' },
];

files.forEach((file) => {
  const filePath = path.join(__dirname, file.path);
  const fileName = `${file.name}_${Date.now()}`;

  uploadFile(filePath, fileName);
});
