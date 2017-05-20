/**
 * Raw as in using straight up aws js sdk.
 * NOTE: this executes once and waits for WaitTimeSeconds before
 * returning
 */

'use strict';

const aws = require('aws-sdk');

aws.config.update({
    region: "us-east-1"
});

const sqs = new aws.SQS();

const removeFromQueue = function (message) {

};


sqs.receiveMessage(
    {
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/825045951004/message-validation-queue",
        MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
        VisibilityTimeout: 60, // seconds - how long we want a lock on this job
        WaitTimeSeconds: 10 // seconds - how long should we wait for a message?

    }, function (err, data) {

        // If there are any messages to get
        if (data.Messages) {
            // Get the first message (should be the only one since we said to only get one above)
            let message = data.Messages[0],
                body = JSON.parse(message.Body);
            // Now this is where you'd do something with this message
            doSomethingCool(body, message);  // whatever you wanna do

            // Clean up after yourself... delete this message from the queue, so it's not executed again
            removeFromQueue(message);  // We'll do this in a second
        }
    }
);