# Events 


    {
      "Records": [
        {
          "eventID": "1",
          "eventVersion": "1.0",
          "dynamodb": {
            "Keys": {
              "Id": {
                "N": "101"
              }
            },
            "NewImage": {
              "Message": {
                "S": "New item!"
              },
              "Id": {
                "N": "101"
              }
            },
            "StreamViewType": "NEW_AND_OLD_IMAGES",
            "SequenceNumber": "111",
            "SizeBytes": 26
          },
          "awsRegion": "us-west-2",
          "eventName": "INSERT",
          "eventSourceARN": "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
          "eventSource": "aws:dynamodb"
        },
        {
          "eventID": "2",
          "eventVersion": "1.0",
          "dynamodb": {
            "OldImage": {
              "Message": {
                "S": "New item!"
              },
              "Id": {
                "N": "101"
              }
            },
            "SequenceNumber": "222",
            "Keys": {
              "Id": {
                "N": "101"
              }
            },
            "SizeBytes": 59,
            "NewImage": {
              "Message": {
                "S": "This item has changed"
              },
              "Id": {
                "N": "101"
              }
            },
            "StreamViewType": "NEW_AND_OLD_IMAGES"
          },
          "awsRegion": "us-west-2",
          "eventName": "MODIFY",
          "eventSourceARN": "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
          "eventSource": "aws:dynamodb"
        },
        {
          "eventID": "3",
          "eventVersion": "1.0",
          "dynamodb": {
            "Keys": {
              "Id": {
                "N": "101"
              }
            },
            "SizeBytes": 38,
            "SequenceNumber": "333",
            "OldImage": {
              "Message": {
                "S": "This item has changed"
              },
              "Id": {
                "N": "101"
              }
            },
            "StreamViewType": "NEW_AND_OLD_IMAGES"
          },
          "awsRegion": "us-west-2",
          "eventName": "REMOVE",
          "eventSourceARN": "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
          "eventSource": "aws:dynamodb"
        }
      ]
    }
    
    
A sample insert event
  
    
    {
      "Records": [
        {
          "eventID": "1",
          "eventVersion": "1.0",
          "dynamodb": {
            "Keys": {
              "RecordID": {
                "S": "2"
              }
            },
            "NewImage": {
              "RecordID": {
                "S": "2"
              },
              "Username": {
                "S": "Jane Doe"
              },
              "Score": {
                "N": "100"
              },
              "Nickname": {
                "S": "JaneD"
              }
            },
            "StreamViewType": "NEW_IMAGE",
            "SequenceNumber": "111",
            "SizeBytes": 26
          },
          "awsRegion": "us-west-2",
          "eventName": "INSERT",
          "eventSourceARN": "arn:aws:dynamodb:us-west-2:account-id:table/GameScoreRecords/stream/2015-10-07T00:48:05.899",
          "eventSource": "aws:dynamodb"
        }
      ]
    }
    
- 
