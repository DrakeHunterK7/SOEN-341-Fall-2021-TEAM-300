# Import MongoClient from PyMongo
import pymongo

# Initialize a client and connect it to the database
link = 'mongodb+srv://SOEN341T300:Soen_341_T_300@cluster0.qvzq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = pymongo.MongoClient(link, tls=True, tlsAllowInvalidCertificates=True)

# Print the database names in the server
print(client.list_database_names())

# Create a variable to store the database we will work on
db = client["Stack-Bubbling"]

# Access collections names in database
print(db.list_collection_names())