let AWS = require("aws-sdk");
let async = require("async");
let QUEUE_URL = "SQS_QUEUE_URK";
let WORKER_LAMBDA_FUNCTION_NAME = "LAMBDA_FUNCTION_NAME";
let REGION = "AWS_REGION";
let sqs = new AWS.SQS({region: REGION});
let lambda = new AWS.Lambda({region: REGION});

function receiveMessages(callback) {

    let params = {
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 10
    };

    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            console.error(err, err.stack);
            callback(err);
        } else {
            callback(null, data.Messages);
        }
    });
}
function invokeWorkerLambda(task, callback) {
    let params = {
        FunctionName: WORKER_LAMBDA_FUNCTION_NAME,
        InvocationType: 'Event',
        Payload: JSON.stringify(task)
    };

    lambda.invoke(params, function (err, data) {
        if (err) {
            console.error(err, err.stack);
            callback(err);
        } else {
            callback(null, data)
        }
    });
}
function handleSQSMessages(context, callback) {

    receiveMessages(function (err, messages) {
        if (messages && messages.length > 0) {
            let invocations = [];
            messages.forEach(function (message) {
                invocations.push(function (callback) {
                    invokeWorkerLambda(message, callback)
                });
            });
            async.parallel(invocations, function (err) {
                if (err) {
                    console.error(err, err.stack);
                    callback(err);
                } else {
                    if (context.getRemainingTimeInMillis() > 20000) {
                        handleSQSMessages(context, callback);
                    } else {
                        callback(null, "PAUSE");
                    }
                }
            });
        } else {
            callback(null, "DONE");
        }
    });

}
exports.handler = function (event, context, callback) {
    handleSQSMessages(context, callback);
};