var AWS = require("aws-sdk");

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'ApplicationEntities',

    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'entity',
            KeyType: 'HASH',
        }
        , { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'application',
            KeyType: 'RANGE',
        }
    ],

    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'entity',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
        , {
            AttributeName: 'application',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
        // ,{
        //     AttributeName: 'index_hash_key_attribute_name_1',
        //     AttributeType: 'S', // (S | N | B) for string, number, binary
        // }

        // ,{
        //     AttributeName: 'index_range_key_attribute_name_1',
        //     AttributeType: 'S', // (S | N | B) for string, number, binary
        // }

        // ,{
        //     AttributeName: 'index_range_key_attribute_name_2',
        //     AttributeType: 'S', // (S | N | B) for string, number, binary
        // }

        // ... more attributes ...
    ],

    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    }

    // ,GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
    //     {
    //         IndexName: 'index_name_1',
    //         KeySchema: [
    //             { // Required HASH type attribute
    //                 AttributeName: 'index_hash_key_attribute_name_1',
    //                 KeyType: 'HASH',
    //             },
    //             { // Optional RANGE key type for HASH + RANGE secondary indexes
    //                 AttributeName: 'index_range_key_attribute_name_1',
    //                 KeyType: 'RANGE',
    //             }
    //         ],
    //         Projection: { // attributes to project into the index
    //             ProjectionType: 'INCLUDE', // (ALL | KEYS_ONLY | INCLUDE)
    //             NonKeyAttributes: [ // required / allowed only for INCLUDE
    //                 'attribute_name_1',
    //                 // ... more attribute names ...
    //             ],
    //         },
    //         ProvisionedThroughput: { // throughput to provision to the index
    //             ReadCapacityUnits: 1,
    //             WriteCapacityUnits: 1,
    //         },
    //     },
    //     // ... more global secondary indexes ...
    // ]

    // ,LocalSecondaryIndexes: [ // optional (list of LocalSecondaryIndex)
    //     {
    //         IndexName: 'application_type',
    //         KeySchema: [
    //             { // Required HASH type attribute - must match the table's HASH key attribute name
    //                 AttributeName: 'type',
    //                 KeyType: 'HASH',
    //             }
    //             // ,{ // alternate RANGE key attribute for the secondary index
    //             //     AttributeName: 'index_range_key_attribute_name_2',
    //             //     KeyType: 'RANGE',
    //             // }
    //         ],
    //         Projection: { // required
    //             ProjectionType: 'ALL' // (ALL | KEYS_ONLY | INCLUDE)
    //             // ,NonKeyAttributes: [ // required / allowed only for INCLUDE
    //             //     'attribute_name_1',
    //             //     // ... more attribute names ...
    //             // ],
    //         },
    //     }
    //     // ... more local secondary indexes ...
    // ]
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("JSON:", JSON.stringify(data, null, 2));
    }
});