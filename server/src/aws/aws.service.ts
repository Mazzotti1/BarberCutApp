import AWS from 'aws-sdk';


const accessKeyId = String(process.env.ACCESS_KEY);
const secretAccessKey = String(process.env.SECRET_ACCESS_KEY);


const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: 'us-east-1',
});

export {s3};