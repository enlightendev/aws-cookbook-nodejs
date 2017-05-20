const AWS = require("aws-sdk");
const awsConf = require("./conf/aws-conf");

awsConf.setupEnvironment();

const dynamodb = new AWS.DynamoDB();

let params = {
    TableName: "Movies"
};

dynamodb.deleteTable(params, function (err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});