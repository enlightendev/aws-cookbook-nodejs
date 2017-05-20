var AWS = require("aws-sdk");
var fs = require('fs');

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var appEntities = JSON.parse(fs.readFileSync('entity_tags.json', 'utf8'));

appEntities.forEach(function (record) {
    console.log(JSON.stringify(record, null, 2));
    var params = {
        TableName: "EntityTags",
        Item: record
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Error: ", record.entity, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("succeeded:", JSON.stringify(data, null, 2));
        }
    });
});