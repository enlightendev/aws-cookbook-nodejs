/**
 * http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.OnlineOps.html
 *
 * http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.JsShell.06.html
 */
var AWS = require("aws-sdk");
var awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

var params = {
    TableName: "Applications",
    AttributeDefinitions: [
        {AttributeName: "category", AttributeType: "S"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "ApplicationsByCategory",
                KeySchema: [
                    {AttributeName: "category", KeyType: "HASH"},  //Partition key
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