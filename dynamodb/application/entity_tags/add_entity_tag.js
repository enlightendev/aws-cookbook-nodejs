/**
 *
 */
'use strict';

var AWS = require('aws-sdk');
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "EntityTags",
    Item: {
        "entityId": "policy#4",
        "tagk": "q3-rev",
        "tagv": "$2200",
        "app": "fmdb"
    }
};

docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});