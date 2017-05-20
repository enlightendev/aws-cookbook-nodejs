const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();
const docClient = new AWS.DynamoDB.DocumentClient();

let table = "Movies";

let year = 2015;
let title = "The Big New Movie";

let params = {
    TableName: table,
    Item: {
        "year": year,
        "title": title,
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 4
        }
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