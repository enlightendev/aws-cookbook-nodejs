/**
 * Get all tags for an application.
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "EntityTags",
    IndexName: "EntityByApp",
    KeyConditionExpression: "app = :application",
    ExpressionAttributeValues: {
        ":application": "e3"
    },
    //projection expression to limit returned attributes
    // ProjectionExpression: "tagk"
};

docClient.query(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});