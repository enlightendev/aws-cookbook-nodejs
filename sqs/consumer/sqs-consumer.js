/**
 * Use sqs-consumer to simplify queue operations.
 */

'use strict';

let aws = require('aws-sdk');
aws.config.update({
    region: "us-east-1"
});

let Consumer = require('sqs-consumer');

let queueWorker = Consumer.create(
    {
        queueUrl: '',

        handleMessage: function (message, done) {

            // do some work with `message`
            console.log(message);
            // console.log(message.Body);

            //Messages are deleted from the queue once done() is called.
            done();
        }
    }
);

queueWorker.on('error', function (err) {
    console.log(err.message);
});

queueWorker.start();