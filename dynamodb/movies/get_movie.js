const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";

let year = 2015;
let title = "The Big New Movie";

let params = {
    TableName: table,
    Key: {
        "year": year,
        "title": title
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Succeeded:", JSON.stringify(data, null, 2));
    }
});