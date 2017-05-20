const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const kinesis = new AWS.Kinesis();

const params = {
    ShardCount: 1, /* required */
    StreamName: 'twitter-js' /* required */
};

kinesis.createStream(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
