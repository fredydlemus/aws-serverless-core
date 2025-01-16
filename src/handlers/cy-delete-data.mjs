import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { 
    DynamoDBDocumentClient, DeleteCommand
  } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMO_TABLE_NAME;

export const cyDeleteDataHandler = async (event, context, callback) => {
    const params = {
      Key: {
        UserId: "user_0.9737686412234368"
      },
      TableName: tableName
    }

    try{
      const data = await docClient.send(new DeleteCommand(params))

      console.log(data)

      callback(null, data)
    }catch(error){
      console.log("Error", error);
      callback(error)
    }
}