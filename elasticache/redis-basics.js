const redis = require('redis');

const client = redis.createClient(6379, "<redis_url>");

client.on('connect', function () {
    console.log('connected');
});

client.on('ready', function () {
    console.log("Redis is ready");
});

client.on('error', function () {
    console.log("Error in Redis");
});

client.get('user:2', function (err, reply) {
    console.log(reply);
});

client.lrange('lservers', 0, -1, function (err, reply) {
    console.log(reply);
});