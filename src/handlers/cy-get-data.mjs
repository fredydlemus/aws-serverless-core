import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DynamoDBDocumentClient, ScanCommand, GetCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-1' });

const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMO_TABLE_NAME;

export const cyGetDataHandler = async (event, context, callback) => {
    console.log(event)
    const type = event.type
    if (type === 'all') {
        const params = {
            TableName: tableName
        }

        try {
            const data = await docClient.send(new ScanCommand(params));

            console.log(data)

            const items = data.Items.map(
                (dataField) => {
                    return {
                        age: dataField.Age,
                        height: dataField.Height,
                        Income: dataField.Income
                    }
                }
            );

            callback(null, items)
        } catch (error) {
            console.log("Error", error.stack);
            callback(error)
        }
    } else if (type === 'single') {
       const params = {
        Key: {
            UserId: "user_0.9737686412234368"
        },
        TableName: tableName
       }

       try{
        const data = await docClient.send(new GetCommand(params))

        console.log(data)
        callback(null, {
            age: data.Item.Age,
            height: data.Item.Height,
            income: data.Item.Income
        })

       }catch(error){
            console.log("Error", error);
            callback(error)
       }
    } else {
        callback('something went wrong!')
    }
}