import connexion
from database import create_table_users, create_user, get_all_users, update_user, delete_user
from flask_cors import CORS

users = [] # local cache

def create_new_table():
    create_table_users()

def delete_by_id(userToDelete):
    # print ("id to find", userToDelete['id'])
    delete_user(userToDelete['id'])

def get_user():
    users = get_all_users()
    return users  # whatever gets returned in the function is what returns in the response.

def insert_user(newUser): # parameter must be named in reference to x-body-name in request-body of post
    create_user(newUser)

def update_user_data(updateUser):
    update_user(updateUser)

app = connexion.App(__name__)
CORS(app.app)
app.add_api("../spec/test.yaml") # requiredd to add all specs/yamls to the add.api function

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=True) # server/host information, same as app.listen without the call back.