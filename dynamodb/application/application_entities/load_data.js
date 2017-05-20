var AWS = require("aws-sdk");
var fs = require('fs');

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var appEntities = JSON.parse(fs.readFileSync('application_entities.json', 'utf8'));

appEntities.forEach(function (record) {
    var params = {
        TableName: "ApplicationEntities",
        Item: {
            "entity": record.entity,
            "application": record.application,
            "attributes": record.attributes,
            "category": record.category
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add movie", record.entity, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", record.entity);
        }
    });
});