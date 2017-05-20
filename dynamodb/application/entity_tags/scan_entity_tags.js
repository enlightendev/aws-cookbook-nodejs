var AWS = require("aws-sdk");

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var dynamodb = new AWS.DynamoDB();

var params = {

    TableName: 'EntityTags'
    // Limit: 0, // optional (limit the number of items to evaluate)

    // ,FilterExpression: 'application = :value', // a string representing a constraint on the attribute

    // ,ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
    //     //'#name': 'attribute name'
    // }

    // ,ExpressionAttributeValues: { // a map of substitutions for all attribute values
    //     ':value': 'STRING_VALUE'
    // }

    // ,FilterExpression: 'contains(entity, :name)'
    //
    // ,ExpressionAttributeValues: {
    //     ':name': {
    //         'S': 'product'
    //     }
    // }

    // ,Select: 'SPECIFIC_ATTRIBUTES' // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES |
    //           SPECIFIC_ATTRIBUTES | COUNT)
    // ,AttributesToGet: [ // optional (list of specific attribute names to return)
    //     'application'
    //     // , ... more attributes ...
    // ]

    // ,ConsistentRead: false // optional (true | false)

    // ,Segment: 0 // optional (for parallel scan)

    // ,TotalSegments: 0 // optional (for parallel scan)

    // ,ExclusiveStartKey: { // optional (for pagination, returned by prior calls as LastEvaluatedKey)
    //     attribute_name: attribute_value,
    //     // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
    //     // anotherKey: ...
    // }

    // ,ReturnConsumedCapacity: 'NONE' // optional (NONE | TOTAL | INDEXES)
};

dynamodb.scan(params, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        data.Items.forEach((record) => {
            console.log("\n -------------------------");
            console.log("Record:" + JSON.stringify(record, null, 2));
        })
    }

});