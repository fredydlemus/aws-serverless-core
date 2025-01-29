import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DynamoDBDocumentClient, ScanCommand, GetCommand
} from "@aws-sdk/lib-dynamodb";
import {CognitoIdentityProviderClient, GetUserCommand} from '@aws-sdk/client-cognito-identity-provider'

const client = new DynamoDBClient({ region: 'us-east-1' });

const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMO_TABLE_NAME;

const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });

export const cyGetDataHandler = async (event, context, callback) => {
    const accessToken = event.accessToken;
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


        const command = new GetUserCommand({ AccessToken: accessToken });
        const response = await cognitoClient.send(command);

        const userId = response.UserAttributes.find(attr => attr.Name === 'sub')?.Value;

       const params = {
        Key: {
            UserId: userId
        },
        TableName: tableName
       }

       try{
        const data = await docClient.send(new GetCommand(params))

        console.log(data)
        callback(null, [{
            age: data.Item.Age,
            height: data.Item.Height,
            income: data.Item.Income
        }])

       }catch(error){
            console.log("Error", error);
            callback(error)
       }
    } else {
        callback('something went wrong!')
    }
}