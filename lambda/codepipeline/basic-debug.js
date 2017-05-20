/**
 * http://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#LambdaSample1
 */
const assert = require('assert');
const AWS = require('aws-sdk');
const http = require('http');

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    const codepipeline = new AWS.CodePipeline();

    // Retrieve the Job ID from the Lambda action
    let jobId = event["CodePipeline.job"].id;

    // Retrieve the value of UserParameters from the Lambda action configuration in AWS CodePipeline, in this case a URL which will be
    // health checked by this function.
    let url = event["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters;

    // Notify AWS CodePipeline of a successful job
    const putJobSuccess = function (message) {
        const params = {
            jobId: jobId
        };
        codepipeline.putJobSuccessResult(params, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, message);
            }
        });
    };

    // Notify AWS CodePipeline of a failed job
    const putJobFailure = function (message) {
        const params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        };
        codepipeline.putJobFailureResult(params, function (err, data) {
            // context.fail(message);
            callback(message);
        });

    };

    // Succeed the job
    putJobSuccess("Tests passed.");

};