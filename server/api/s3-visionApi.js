const AWS = require('aws-sdk');
const router = require('express').Router();
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const S3_BUCKET = 'my-moodify';
const bigConversionFunc = require('./conversionFunction.js');

if (process.env.NODE_ENV === 'development')
	require('../../secrets/keys/secrets.js');

module.exports = router;

// configure the keys for accessing AWS
AWS.config.update({
<<<<<<< HEAD
  accessKeyId: s3secrets.accessKeyId,
  secretAccessKey: s3secrets.secretAccessKey,
=======
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
>>>>>>> master
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

// Defining google cloud vision api:
const vision = require('@google-cloud/vision');

const client_email = process.env.client_email;
const private_key = process.env.private_key;
const private_key_id = process.env.private_key_id;
const client = new vision.ImageAnnotatorClient({
<<<<<<< HEAD
  keyFilename: GoogleAPIKey,
=======
	credentials: { client_email, private_key, private_key_id }
>>>>>>> master
});

async function detectFaces(inputFile) {
  try {
    // Make a call to the Vision API to detect the faces
    const request = {
      image: { content: inputFile.slice(inputFile.indexOf('9') - 1) },
    };
    // console.log('request', request);
    const response = await client.faceDetection(request);
    const facialData = response[0].faceAnnotations[0];
    return facialData;
  } catch (err) {
    console.log('Cloud Vision API Error:', err);
  }
}

// Define POST route
// Integrate Google Cloud Vision API in the route
// Return facial data object

router.post('/upload', (request, response) => {
<<<<<<< HEAD
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      const urlLink = data.Location;
      const facialDataObj = await detectFaces(urlLink);
      const spotifyQuery = bigConversionFunc(facialDataObj);
      const {
        joyLikelihood,
        sorrowLikelihood,
        angerLikelihood,
        surpriseLikelihood,
      } = facialDataObj;

      const returnData = {
        joyLikelihood,
        sorrowLikelihood,
        angerLikelihood,
        surpriseLikelihood,
        spotifyQuery,
      };
      return response.status(200).send(returnData);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

// Instant photo route:
router.post('/capture', async (request, response) => {
  try {
    const urlLink = request.body.url;
    const facialDataObj = await detectFaces(urlLink);
    const spotifyQuery = bigConversionFunc(facialDataObj);
    const {
      joyLikelihood,
      sorrowLikelihood,
      angerLikelihood,
      surpriseLikelihood,
    } = facialDataObj;
=======
	console.log('hello world');
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error);
		try {
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = fileType(buffer);
			const timestamp = Date.now().toString();
			const fileName = `bucketFolder/${timestamp}-lg`;
			const data = await uploadFile(buffer, fileName, type);
			const urlLink = data.Location;
			const facialDataObj = await detectFaces(urlLink);
			const spotifyQuery = bigConversionFunc(facialDataObj);
			const {
				joyLikelihood,
				sorrowLikelihood,
				angerLikelihood,
				surpriseLikelihood
			} = facialDataObj;
>>>>>>> master

    const returnData = {
      joyLikelihood,
      sorrowLikelihood,
      angerLikelihood,
      surpriseLikelihood,
      spotifyQuery,
    };
    return response.status(200).send(returnData);
  } catch (error) {
    return response.status(400).send(error);
  }
});

// S3-integrated API:
// router.post('/upload', (request, response) => {
// 	const form = new multiparty.Form();
// 	form.parse(request, async (error, fields, files) => {
// 	  if (error) throw new Error(error);
// 	  try {
// 		const path = files.file[0].path;
// 		const buffer = fs.readFileSync(path);
// 		const type = fileType(buffer);
// 		const timestamp = Date.now().toString();
// 		const fileName = `bucketFolder/${timestamp}-lg`;
// 		const data = await uploadFile(buffer, fileName, type);
// 		const urlLink = data.Location;
// 		const facialDataObj = await detectFaces(urlLink);
// 		const spotifyQuery = bigConversionFunc(facialDataObj);
// 		const {
// 		  joyLikelihood,
// 		  sorrowLikelihood,
// 		  angerLikelihood,
// 		  surpriseLikelihood,
// 		} = facialDataObj;

// 		const returnData = {
// 		  joyLikelihood,
// 		  sorrowLikelihood,
// 		  angerLikelihood,
// 		  surpriseLikelihood,
// 		  spotifyQuery,
// 		};
// 		return response.status(200).send(returnData);
// 	  } catch (error) {
// 		return response.status(400).send(error);
// 	  }
// 	});
//   });
