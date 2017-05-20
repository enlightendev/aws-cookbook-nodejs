'use strict';
console.log('Loading function');
const aws = require('aws-sdk');
const stepfunctions = new aws.StepFunctions();
const ses = new aws.SES();

exports.handler = (event, context, callback) => {

    var taskParams = {
        activityArn: 'arn:aws:states:us-west-2:807578712478:activity:ManualStep'
    };

    stepfunctions.getActivityTask(taskParams, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('An error occured while calling getActivityTask.');
        } else {
            if (data === null) {
                // No activities scheduled
                context.succeed('No activities received after 60 seconds.');
            } else {
                var input = JSON.parse(data.input);
                var emailParams = {
                    Destination: {
                        ToAddresses: [
                            input.managerEmailAddress
                        ]
                    },
                    Message: {
                        Subject: {
                            Data: 'Your Approval Needed for Promotion!',
                            Charset: 'UTF-8'
                        },
                        Body: {
                            Html: {
                                Data: 'Hi!<br />' +
                                input.employeeName + ' has been nominated for promotion!<br />' +
                                'Can you please approve:<br />' +
                                'https://API_DEPLOYMENT_ID.execute-api.us-east-1.amazonaws.com/respond/succeed?taskToken=' + encodeURIComponent(data.taskToken) + '<br />' +
                                'Or reject:<br />' +
                                'https://API_DEPLOYMENT_ID.execute-api.us-east-1.amazonaws.com/respond/fail?taskToken=' + encodeURIComponent(data.taskToken),
                                Charset: 'UTF-8'
                            }
                        }
                    },
                    Source: input.managerEmailAddress,
                    ReplyToAddresses: [
                        input.managerEmailAddress
                    ]
                };

                ses.sendEmail(emailParams, function (err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        context.fail('Internal Error: The email could not be sent.');
                    } else {
                        console.log(data);
                        context.succeed('The email was successfully sent.');
                    }
                });
            }
        }
    });
};