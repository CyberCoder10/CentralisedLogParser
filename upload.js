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

const dataDir = path.join(__dirname, 'data');
const categories = ['cards', 'countr', 'personalaties'];

// read all the files in the data directory
fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.log(`Error occurred while reading directory: ${dataDir}`, err);
  } else {
    files.forEach((dir) => {
      // check if the directory is one of the categories
      if (categories.includes(dir)) {
        const filesPath = path.join(dataDir, dir);
        fs.readdir(filesPath, (err, files) => {
          if (err) {
            console.log(`Error occurred while reading directory: ${filesPath}`, err);
          } else {
            files.forEach((file) => {
              const filePath = path.join(filesPath, file);
              const fileName = `${dir}_${file}`;

              // upload the file to S3
              uploadFile(filePath, fileName);
            });
          }
        });
      }
    });
  }
});
