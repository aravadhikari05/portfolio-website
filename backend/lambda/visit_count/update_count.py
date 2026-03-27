import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('aravadhikari-visitcount-table')

def handler(event, context):
    response = table.update_item(
        Key={'id': 'visits'},
        UpdateExpression='ADD #count :inc',
        ExpressionAttributeNames={'#count': 'count'},
        ExpressionAttributeValues={':inc': 1},
        ReturnValues='UPDATED_NEW'
    )
    
    count = int(response['Attributes']['count'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': 'https://aravadhikari.com',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'count': count})
    }