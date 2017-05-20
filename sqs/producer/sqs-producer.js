/**
 * enter queue url
 */

'use strict';

const Producer = require('sqs-producer');

const producer = Producer.create({
    queueUrl: '<enter_queue_url>',
    region: 'us-east-1'
});


for (let i = 0; i < 200; i++) {

    // send messages to the queue
    producer.send(['msg-type1-' + i, 'msg_type2-' + i, 'msg-type3-' + i], function (err) {
        if (err) console.log(err);
    });
}

// get the current size of the queue
producer.queueSize(function (err, size) {
    if (err)
        console.log(err);

    console.log('There are', size, 'messages on the queue.');
});


// send a message to the queue with a specific ID (by default the body is used as the ID)
// producer.send(
//     [
//         {
//             id: 'id1',
//             body: 'Hello world 1'
//         },
//         {
//             id: 'id2',
//             body: 'Hello world 2'
//         }
//     ],
//     function(err) {
//         if (err) console.log(err);
//     }
// );