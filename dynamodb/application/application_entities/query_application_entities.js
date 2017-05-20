/**
 * This shows to query a table by its primary key attributes. In
 * DynamoDB, you can optionally create one or more secondary indexes
 * on a table, and query those indexes in the same way that you query
 * a table. Secondary indexes give your applications additional
 * flexibility by allowing queries on non-key attributes.
 * http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html
 *
 *
 * ExpressionAttributeNames provides name substitution. We use this because
 * year is a reserved word in DynamoDB—you cannot use it directly in any
 * expression, including KeyConditionExpression. We use the expression
 * attribute name #yr to address this.
 *
 * ExpressionAttributeValues provides value substitution. We use this
 * because you cannot use literals in any expression, including
 * KeyConditionExpression. We use the expression attribute value :yyyy
 * to address this.
 *
 * http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.04.html
 *
 */
var AWS = require("aws-sdk");

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

var docClient = new AWS.DynamoDB.DocumentClient();


var params = {
    TableName: "ApplicationEntities",

    //IndexName: 'EntityByCategory',

    //when querying the main table the expression must use all parts ok primary key:
    //hash or hash and range - same if querying aganist an index.
    KeyConditionExpression: "application = :application and entity = :entity",

    // KeyConditionExpression: "#yr = :yyyy",
    // ExpressionAttributeNames:{
    //     "#yr": "year"
    // },
    ExpressionAttributeValues: {
        ":application": "e3",
        ":entity": "client"
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function (item) {
            console.log(JSON.stringify(item, null, 2));
        });
    }
});