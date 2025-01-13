import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import { 
    DynamoDBDocumentClient, PutCommand
  } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMO_TABLE_NAME;

export const cyStoreDataHandler = async (event, context, callback) => {
  const params = {
    Item: {UserId: "user_"+Math.random(), Age: event.age, Height: event.height, Income: event.income},
    TableName: tableName
  }

  try{
    const data = await docClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
    callback(null, data)
  }catch(error){
    console.log("Error", err.stack);
    callback(e)
  }
}