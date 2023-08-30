from boto3 import resource

database = resource(
    "dynamodb",
    endpoint_url="http://localhost:8000")

def create_table_users() -> object:
    table = database.create_table(
        TableName="Users",
        KeySchema=[
            {
                "AttributeName": "id",
                "KeyType": "HASH"
            },
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "id",
                "AttributeType": "N"
            },
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
    )
    return table

def create_user(newUser: object) -> object:
    print("user details", newUser)
    table = database.Table("Users")
    print(table.table_status)
    table.put_item(Item= {'id': newUser['id'], 'firstname': newUser["firstname"], 'surname': newUser["surname"]})

def get_all_users() -> object:
    table = database.Table("Users")
    data = table.scan() # scans the table, however, restrictions, research LastEvaludatedKey
    print("data", data["Items"]) # users found in the Items key
    return data['Items']

def update_user(updateUser: object) -> object:
    table = database.Table("Users")
    print("incoming update:", updateUser)
    response = table.update_item(
        Key={'id': updateUser['id']},
        UpdateExpression="SET firstname= :f, surname= :s",
        ExpressionAttributeValues={':f': updateUser["firstname"], ':s': updateUser["surname"]},
        ReturnValues="UPDATED_NEW"
    )
    return response

def delete_user(userToDelete):
    table = database.Table("Users")
    table.delete_item(
        Key={'id': userToDelete}
    )