/**
 * http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.OnlineOps.html
 *
 * http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.JsShell.06.html
 */
const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

const dynamodb = new AWS.DynamoDB();

let params = {
    TableName: "Movies",
    AttributeDefinitions: [
        {AttributeName: "Genre", AttributeType: "S"},
        {AttributeName: "Price", AttributeType: "N"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "GenreAndPriceIndex",
                KeySchema: [
                    {AttributeName: "Genre", KeyType: "HASH"},  //Partition key
                    {AttributeName: "Price", KeyType: "RANGE"},  //Sort key
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