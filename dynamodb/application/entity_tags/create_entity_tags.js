var AWS = require("aws-sdk");

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var dynamodb = new AWS.DynamoDB();


var params = {
    TableName: 'EntityTags',
    KeySchema: [
        {
            AttributeName: 'entityId',
            KeyType: 'HASH'
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'tagk',
            KeyType: 'RANGE',
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'entityId',
            AttributeType: 'S'
        },
        {
            AttributeName: 'tagk',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }, //from LSI
        {
            AttributeName: 'app',
            AttributeType: 'S' // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    LocalSecondaryIndexes: [ // optional (list of LocalSecondaryIndex)
        {
            IndexName: 'idx_applications',
            KeySchema: [
                { // Required HASH type attribute - must match the table's HASH key attribute name
                    AttributeName: 'entityId',
                    KeyType: 'HASH',
                },
                { // alternate RANGE key attribute for the secondary index
                    AttributeName: 'app',
                    KeyType: 'RANGE',
                }
            ],
            Projection: { // required
                ProjectionType: 'ALL', // (ALL | KEYS_ONLY | INCLUDE)
                // NonKeyAttributes: [ // required / allowed only for INCLUDE
                //     'attribute_name_1',
                //     // ... more attribute names ...
                // ],
            }
        }
        // ... more local secondary indexes ...
    ]
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("JSON:", JSON.stringify(data, null, 2));
    }
});