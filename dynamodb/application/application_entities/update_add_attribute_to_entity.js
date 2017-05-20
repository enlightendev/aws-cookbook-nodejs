var AWS = require("aws-sdk");

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "ApplicationEntities",

    Key: {
        "entity": "policy",
        "application": "e2"
    },

    // ConditionExpression: "attribute_not_exists(town)",

    UpdateExpression: "SET attributes = list_append(attributes, :attrValue)",

    ExpressionAttributeValues: {
        ":attrValue": ["tmp", "tmp2", "tmp3"]
    }
};

docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});