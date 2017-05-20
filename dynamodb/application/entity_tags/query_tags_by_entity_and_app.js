/**
 * Give me all tags related to an entity and application
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "EntityTags",
    IndexName: "idx_applications",
    KeyConditionExpression: "entityId = :entityId and app = :application",
    ExpressionAttributeValues: {
        ":application": "fmdb",
        ":entityId": "policy#4"
    },
    // ProjectionExpression: "entity"
};

docClient.query(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});