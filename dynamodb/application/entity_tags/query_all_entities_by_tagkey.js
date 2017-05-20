/**
 * Give me all entities across all systems having a particular tag
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "EntityTags",
    IndexName: "EntityByTagKey",
    KeyConditionExpression: "tagk = :tagKey",
    ExpressionAttributeValues: {
        ":tagKey": "q2-rev"
    },
    // ProjectionExpression: "entity"
};

docClient.query(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});