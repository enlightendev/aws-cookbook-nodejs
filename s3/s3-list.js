let AWS = require('aws-sdk');

// Create an S3 client
let s3 = new AWS.S3();

s3.listBuckets(function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data.Owner);           // successful response

    data.Buckets.forEach(bucket => {
        console.log(bucket.Name);
    });
});