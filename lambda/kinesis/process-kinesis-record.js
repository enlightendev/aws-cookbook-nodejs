/**
 * NOTE ascii or UTF-8
 */

'use strict';

/**
 *
 * @param event
 * @param context
 * @param callback
 */
exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    event.Records.forEach((record) => {

        // Kinesis data is base64 encoded so decode here
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
    });

    callback(null, 'Successfully processed ${event.Records.length} records.');
};