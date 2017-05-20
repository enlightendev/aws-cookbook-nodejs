var AWS = require("aws-sdk");
var fs = require('fs');
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var appEntities = JSON.parse(fs.readFileSync('applications.json', 'utf8'));

appEntities.forEach(function (record) {
    var params = {
        TableName: "Applications",
        Item: record
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Err: ", record, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", record);
        }
    });
});