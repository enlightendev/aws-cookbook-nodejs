## About

Realtime processing with Kenisis

## Commands

- setup cli

export AWS_ACCESS_KEY_ID=aaaaaa
export AWS_SECRET_ACCESS_KEY=bbbbb
export AWS_DEFAULT_REGION=us-west-2

- add records to kinesis

aws kinesis put-record --stream-name Mystream --data "testdata" --partition-key shardId-000000000000

