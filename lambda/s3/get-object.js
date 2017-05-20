'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({apiVersion: '2006-03-01'});


exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    let bucket = event.Records[0].s3.bucket.name;

    let key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    let params = {
        Bucket: bucket,
        Key: key,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.log(err);
            let message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
            console.log(message);
            callback(message);
        } else {
            console.log('CONTENT TYPE:', data.ContentType);
            callback(null, data.ContentType);
        }
    });
};
