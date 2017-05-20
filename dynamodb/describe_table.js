const AWS = require("aws-sdk");
const awsConf = require("./conf/aws-conf");

awsConf.setupEnvironment();

const dynamodb = new AWS.DynamoDB();

let params = {
    TableName: "Movies"
};

dynamodb.describeTable(params, function (err, data) {
    if (err) {
        console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Tables:", JSON.stringify(data, null, 2));
    }
});