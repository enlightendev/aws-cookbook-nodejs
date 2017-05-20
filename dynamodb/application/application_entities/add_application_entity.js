/**
 *
 */

'use strict';

var AWS = require('aws-sdk');
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "ApplicationEntities",
    Item: {
        "entity": "tmp",
        "application": "tmp",
        "attributes": ["lob", "product_line", "phase"],
        "category": "business",
        "rank": 4
    }
};

console.log("Adding a new item...");

docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});