# About

This recipe allows cloud watch to send specific log groups to ES domain.

## iam policy

Cloudwatch uses lambda to send data to elastic search. This policy is 
associated to lambda_elasticsearch_execution iam role.
 

     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "logs:CreateLogGroup",
             "logs:CreateLogStream",
             "logs:PutLogEvents"
           ],
           "Resource": [
             "arn:aws:logs:*:*:*"
           ]
         },
         {
           "Effect": "Allow",
           "Action": "es:ESHttpPost",
           "Resource": "arn:aws:es:*:*:*"
         }
       ]
     }
     
     
## log formats
 

format = [timestamp=*Z, request_id="*-*", event]
 
    START RequestId: abcf198d-96cc-11e6-991c-d5944f403706 Version: $LATEST
    
    2016-10-20T13:54:08.438Z  abcf198d-96cc-11e6-991c-d5944f403706	Received event: {
      "params": {
        "path": {},
        "querystring": {
          "application": "fmdb"
        },
        "header": {}
      }
    }

    2016-10-20T13:54:09.339Z	abcf198d-96cc-11e6-991c-d5944f403706	Query succeeded.
    END RequestId: abcf198d-96cc-11e6-991c-d5944f403706
    REPORT RequestId: abcf198d-96cc-11e6-991c-d5944f403706	Duration: 920.24 ms	Billed Duration: 1000 ms 	Memory Size: 128 MB	Max Memory Used: 25 MB
        






     
