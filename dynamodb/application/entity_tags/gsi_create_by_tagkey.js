/**
 * create a gsi that allows retrieval of all entities by tag key
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "EntityTags",
    AttributeDefinitions: [
        {AttributeName: "tagk", AttributeType: "S"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "EntityByTagKey",
                KeySchema: [
                    {AttributeName: "tagk", KeyType: "HASH"},  //Partition key
                    // {AttributeName: "Price", KeyType: "RANGE"},  //Sort key
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1, "WriteCapacityUnits": 1
                }
            }
        }
    ]
};

dynamodb.updateTable(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});