import {DynamoDBClient} from 'aws-sdk/client-dynamodb'
import { 
    DynamoDBDocumentClient, PutCommand
  } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

export const cyStoreDataHandler = async (event, context, callback) => {
  const params = {
    Item: {UserId: "dasasdsa", Age: 27, Height: 72, Income: 2500},
    TableName: "compare-yourself-table"
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