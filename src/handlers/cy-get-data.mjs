import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DynamoDBDocumentClient, ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'us-east-1' });

const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMO_TABLE_NAME;

export const cyGetDataHandler = async (event, context, callback) => {
    console.log(event)
    const type = event.type
    if (type === 'all') {
        try {

            const params = {
                TableName: tableName
            }

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
        callback(null, 'Just my data')
    } else {
        callback(null, 'Hello from lambda!')
    }
}