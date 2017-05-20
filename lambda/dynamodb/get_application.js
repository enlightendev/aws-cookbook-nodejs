'use strict';

let doc = require('aws-sdk');
let dynamo = new doc.DynamoDB();

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    let application = (event.application === undefined ? 'fmdb' : event.application);

    let params = {

        TableName: "Applications",
        KeyConditionExpression: "application = :application",

        //FilterExpression: 'category = :category',

        // ExpressionAttributeNames:{
        //     "#application": "application"
        // },

        ExpressionAttributeValues: {
            ":application": application
            // ,":category": 'finance'
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            context.succeed(data);
        }
    });

};