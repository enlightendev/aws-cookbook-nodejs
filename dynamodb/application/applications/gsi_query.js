/**
 * http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.JsShell.06.html
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Applications",
    IndexName: "ApplicationsByCategory",
    KeyConditionExpression: "category = :category",
    ExpressionAttributeValues: {
        ":category": "marketing"
    },
    // ProjectionExpression: "entity"
};

docClient.query(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});