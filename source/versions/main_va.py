"""
    Date: Tue-14-May-2024
    Contains main routes/endpoints -- if the app was larger it would have bene segregated into multiple files.
    But the app is ok as is.

    Before writing, plan what different endpoints and routes needed for the app's API.
    Since it is a CRUD (Create, Read, Update, Delete) app, these routes are needed.

    Endpoints can be though of as target locations.

    #1   Create -- what is needed?
        Create endpoint requires these:
        first_name
        last_name
        email

    ##::## Requests: requests for something to happen;
        Types:
            GET -- to access a resource -- Read
            POST -- to create something new -- Create
            PUT/PATCH requests -- to update 
            DELETE requests
        Information sent in or alongside a request is most times in JSON format.
    Frontend sends a request to backend. Backend sends a response.
    Response contains these:
        1. Status:
            200 - Success
            404 - Not Found
            400 - Bad Requests
            403 - Forbidden
        2. JSON:
            Contains data

    ########NOTE##############
    This version shows how one can return a JSON object and it will be displayed

"""

##  jsonify to import json data
from flask import request, jsonify
from config import app, DB
from models import Contact



@app.route("/contacts", methods=["GET"])
def get_contacts():
    """
        This url endpoint uses only the GET method
    """
    ##  This uses the flask-sqlalchemy databaser to get all the contacts that exist in the
    ##  SQL contact database
    ##  But these contacts are Python objects.
    contacts = Contact.query.all()

    """ 
        Because they are Python objects, they cannot be returned to the frontend server
        So the need to be converted to JSON
        Map takes all the elements in the list and applies a function to them
        It iterates through the list, saving each element in the in x and applying it to the
        method, .to_json()
        But it returns a map object, hence why it's converted to a list
     """
    json_contacts = list(map(lambda x: x.to_json(), contacts))

    ##  The below creates a dictionary that uses the 'contact_objects' as
    ##  a keys, and the actual list of json_contacts as it's value
    return jsonify({"contacts": json_contacts})
    


if __name__=="__main__":
    with app.app_context():
        ##  The below creates all the different models that already exist
        DB.create_all()
    app.run(debug=True)

