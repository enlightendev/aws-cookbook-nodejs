const AWS = require("aws-sdk");
const awsConf = require("../conf/aws-conf");

awsConf.setupEnvironment();

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

let params = {

    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames: {
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 2015,
        ":letter1": "F",
        ":letter2": "U"
    }
};

docClient.query(params, function (err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function (item) {
            console.log(" -", item.year + ": " + item.title
                + " ... " + item.info.genres
                + " ... " + item.info.actors[0]);
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