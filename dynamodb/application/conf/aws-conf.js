var AWS = require("aws-sdk");

var setupEnvironment = function () {

    if (!process.env.dblocation || !process.env.awsprofile) {
        console.log("must have env dblocation and awsprofile set.");
        process.exit();
    }

    if (process.env.dblocation == 'local') {

        setupLocal();

    } else if (process.env.dblocation == 'aws') {

        setupAWS();

    } else {

        console.log("env dblocation not set");

    }
};

var setupAWS = function () {

    AWS.config.update({
        region: "us-east-1"
    });

    var credentials = new AWS.SharedIniFileCredentials({profile: process.env.awsprofile});
    AWS.config.credentials = credentials;

};

var setupLocal = function () {

    AWS.config.update({
        region: "us-east-1"
        , endpoint: "http://localhost:8000"
    });
};


module.exports = {
    setupEnvironment: setupEnvironment
};