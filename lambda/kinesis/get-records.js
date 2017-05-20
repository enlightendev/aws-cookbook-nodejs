/**
 * Stream events from AWS Kinesis
 */

'use strict';

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    event.Records.forEach((record) => {

        console.log('Processing Record:');

        // Kinesis data is base64 encoded so decode here
        let data = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
        let item = null;

        try {
            item = JSON.parse(data);
            console.log('Data:', item);
        } catch (exception) {
            item = data;
            console.log('Exception: ' + exception);
        }
    });

};
