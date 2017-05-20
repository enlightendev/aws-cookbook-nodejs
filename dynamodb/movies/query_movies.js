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
const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

let params = {
    TableName: "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames: {
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 2015
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function (item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});

/*
 {
 "year": 2013,
 "title": "Rush",
 "info": {
 "directors": ["Ron Howard"],
 "release_date": "2013-09-02T00:00:00Z",
 "rating": 8.3,
 "genres": [
 "Action",
 "Biography",
 "Drama",
 "Sport"
 ],
 "image_url": "http://ia.media-imdb.com/images/M/MV5BMTQyMDE0MTY0OV5BMl5BanBnXkFtZTcwMjI2OTI0OQ@@._V1_SX400_.jpg",
 "plot": "A re-creation of the merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.",
 "rank": 2,
 "running_time_secs": 7380,
 "actors": [
 "Daniel Bruhl",
 "Chris Hemsworth",
 "Olivia Wilde"
 ]
 }
 }
 */