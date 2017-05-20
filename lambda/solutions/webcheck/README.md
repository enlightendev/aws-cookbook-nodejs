# About 

This recipe demonstrates how to use lambda and cloud watch events to 
periodically check the health of http endpoints.

# packaging lambda function

    zip -r LambdaWebCheck.zip . -i node_modules/\* -i LambdaWebCheck.js


# Reference

https://github.com/pmosconi/lambda-webcheck
https://aws.amazon.com/blogs/compute/serverless-testing-with-aws-lambda/
http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html


