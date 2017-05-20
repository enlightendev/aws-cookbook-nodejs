const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();
const docClient = new AWS.DynamoDB.DocumentClient();

let table = "Movies";

let year = 2015;
let title = "The Big New Movie";

// Conditional update (will fail)

let params = {
    TableName: table,
    Key: {
        "year": year,
        "title": title
    },
    UpdateExpression: "remove info.actors[0]",
    ConditionExpression: "size(info.actors) >= :num",
    ExpressionAttributeValues: {
        ":num": 3
    },
    ReturnValues: "UPDATED_NEW"
};

console.log("Attempting a conditional update...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});