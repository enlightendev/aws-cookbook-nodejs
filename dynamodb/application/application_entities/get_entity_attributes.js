/**
 * http://slides.com/timsanteford/conquering-commander-js#/
 */
var AWS = require("aws-sdk");
var program = require('commander');

var awsConf = require("../conf/aws-conf");
awsConf.setupEnvironment();

let list = (entity, application) => {

    var docClient = new AWS.DynamoDB.DocumentClient();

    // GetItem retrieves an item by its exact primary key.
    // This API also has a ConsistentRead parameter for choosing between
    // strictly and eventually consistent read consistency.
    var params = {
        TableName: 'ApplicationEntities',
        Key: {
            entity: entity,
            application: application
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Succeeded:", JSON.stringify(data, null, 2));
        }
    });
};

program
    .command('list')
    .option('-e, --entity <entity>', 'Specify entity')
    .option('-a, --application <application>', 'Specify application')
    .action((command) => {
        console.log("command:" + command.entity);
        console.log("command:" + command.application);
        list(command.entity, command.application)
    });

program.parse(process.argv);