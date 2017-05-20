// Load the SDK and UUID
const AWS = require('aws-sdk');
const uuid = require('node-uuid');

// Create an S3 client
const s3 = new AWS.S3();

// Create a bucket and upload something into it
const bucketName = 'node-sdk-sample-' + uuid.v4();
const keyName = 'hello_world.txt';

s3.createBucket({Bucket: bucketName}, function () {

    const params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    s3.putObject(params, function (err, data) {
        if (err)
            console.log(err);
        else
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
});