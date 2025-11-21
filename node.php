
1. How Server Run
--> Client will request to server for giving data and server will give response to client.

2. Create Folder and file index.js
-- for run that file write node index.js (fileName)



3. Modules are of three types:

--> Core Modules
Node.js has many built-in modules that are part of the platform and come with Node.js installation. These modules can be loaded into the program by using the required function.

Syntax: const module = require('module_name');
Example : fs - used to handle file system.

--> local Modules
Unlike built-in and external modules, local modules are created locally in your Node.js application.

--> Third-party Modules
Third-party modules are modules that are available online using the Node Package Manager(NPM). These modules can be installed in the project folder or globally. Some of the popular third-party modules are Mongoose, express, angular, and React. 

Example:
npm install express
npm install mongoose

type common 
module import export


4. Multiple Methods of calling Request

HTTP (Hyper Text Transfer Protocol Request)

--> GET (Least Secure)
--> POST (Secure)
--> PUT (Secure)
--> PATCH (Secure)
--> DELETE (Less Secure)

nodemon -v
5. Install nodemon globally in your system npm i nodemon -g then run your project with nodemon (nodemon index.js)
If error comes then use this in your command - Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


6. Create Server

7. Install NPM Node packages in project
- npm init || npm init -y it will create a file package.json in which all the information of your project will show like project name, version, packages.
- npm install express
- npm install mongoose


8. gitignore file add line /node_modules


9. delete node_modules folder and use command npm i || npm install

12. Status Code and Data Fetching from file.

11. Asynchronous and Synchronous
- Asynchronous is a non-blocking architecture, so the execution of one task isn't dependent on another. Tasks can run simultaneously. 
- Synchronous is a blocking architecture, so the execution of each operation depends on completing the one before it. Each task requires an answer before moving on to the next iteration.


13. Express Js (Framework)
- Express.js is a web framework for Node.js. It is a fast, robust and asynchronous in nature.

Core features of Express framework:
- It can be used to design single-page, multi-page and hybrid web applications.
- It allows to setup middlewares to respond to HTTP Requests.
- It defines a routing table which is used to perform different actions based on HTTP method and URL.
- It allows to dynamically render HTML Pages based on passing arguments to templates.


Why use Express
- Asynchronous and single threaded
- MVC like structure
- Robust API makes routing easy

Example :-
const express = require('express');
const app = express(); // To make it exucatable.

app.get("", (req, resp) => {
    resp.send("Welcome, to Wscube Tech");
});

app.listen(5000);



14. Request and Response

15. Render HTML Tags and Show Json Data and Link Pages

16. Make HTML Pages

17. Remove Extension from URL, Make 404 page, Apply 404 Page.


18. What is template Engine.
--> Its is used to make pages dynamic.

19. Install ejs template package.

20. Setup Dynamic routing and pages.

21. Loop, header, image fetching.

<%- include('header.ejs'); %>
<% data.addd.forEach((data) => { %>
    <%= data.x %>
<% }) %>





22. Middleware
What are middleware ?

- Middleware is used on routing.
- Middleware functions are those functions that can access and modify the request and response objects in an Express application. They can add functionality to an application, such as logging, authentication, and error handling.

Example : If you have to check user is login or not. they in every routes you have to make condition on that. if u use middleware then only 1 condition u have to make.

Types of Middleware
- Application level middleware
- Routing level Middleware


route = express.Router();
route.use(validation);

server.use('/',route);






23. Mongo DB
--> MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

MongoDB is a NoSQL Database.
The data stored in a collection.
Collection don’t have rows and columns.
Data is stored in the form of object.

Install Mongo DB
Search Environemnt --> Enviroment Variables --> Select Path Option


24. Command Prompt operations in MongoDB

- show dbs || show databases 
- use 'Database Name'

- show collections
- db.createCollection('Collection Name')
- db.'Collection Name Old'.renameCollection('Collection Name New')
- db.'Collection Name'.drop();

- db.dropDatabase()


25. Crud Operations in MongoDB

- db.'Collection Name'.insertOne({});
- db.'Collection Name'.insertMany([{}]);


- db.'Collection Name'.find();
- db.'Collection Name'.find( {category: "News"} )
- db.'Collection Name'.find({}, {title: 1, date: 1})

db.categories.updateOne({
  name : 'Men'
}, {
  $set : {
    name : "Kids"
  }
});


- db.'Collection Name'.updateOne({},{$set:{}});
- db.'Collection Name'.updateMany({ }, { $set: {  } } ) 
- db.'Collection Name'.updateMany({}, { $inc: {  } })

- db.'Collection Name'.deleteOne({});
- db.'Collection Name'.deleteMany({});


26. Install MongoDB and Connect MongoDB with Node Js

const db = await dbConnection();
const var = db.collection('');
const var = await var.insertOne({});

- db.'Collection Name'.find({}, {projection : {title: 1, date: 1}} )

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

npm install express body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

- new mongodb.ObjectId(request.params.id)


27. CORS Origin
- npm i cors

var corsOptions = {
  origin: "API BASE URL",
};

app.use(cors());



28. Mongoose
- What is Mongoose
MongoDB is schema-less by default, but Mongoose allows you to:
- Define schemas with field types and constraints
- Perform CRUD operations easily
- Add custom methods and middleware
- Validate data before saving
- Work with relations (refs/populate)

🔹 Key Features:
- Schema - Define structure of documents
- Model - Create and interact with collections
- Validation - Built-in and custom validation rules
- Middleware - Pre/post hooks for lifecycle events (e.g., save, remove)
- Population - Reference documents in other collections (similar to JOIN)


- Difference between Moongoose and MongoDB
- Install Mongoose
- What is Schema
- What is Model
- Connect node Js and MongoDB with Moongoose




29. Crud Operation in Moongoose.


30. Project Level APIS in Moongoose.
- First install 3 packages in your project folder(express, mongoose, cors)
- create folder structure.

31. Validation Methods

- required: Ensures that a field is present.
- min and max: Define minimum and maximum values for numeric fields.
- enum: Validates that a field's value is one of a predefined set of values.
- match: Validates that a field's value matches a regular expression.
- validate: Allows you to define custom validation functions.

- default
- required: true
- required: [ true, 'Name Is required']
- enum: ['user','admin']
- current date insert use Date.now
- match: /^[a-zA-Z]{2,4}$/
- match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
- minLength
- maxLength
- validate: [validateEmail, 'Please fill a valid email address']

function validateEmail(email) {
  // Your custom validation logic here
  return /\S+@\S+\.\S+/.test(email);
}

validate: {
  validator: function (v) {
    return /\S+@\S+\.\S+/.test(v); // Validate email format
  },
  message: 'Invalid email address'
}

validate: {
  validator: async function(v) {
    const user = await this.constructor.findOne({ username: v });
    return !user;
  },
  message: props => `The specified username is already in use.`
}


32. Select Query Methods

--> Equality: This operation is used to find documents where the value of a field is equal to a specified value.
Example - Model.find({ name: 'John' });


--> Comparison Operators: You can use comparison operators such as $gt, $lt, $gte, and $lte to find documents where the value of a field is greater than, less than, greater than or equal to, or less than or equal to a specified value, respectively.
Example - Model.find({ age: { $gt: 18 } });



--> Logical Operators: You can use logical operators like $and, $or, and $not to perform complex querying.
Example - Model.find({ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] });



--> Sorting: You can sort the results in ascending or descending order based on a field.
Example - Model.find().sort({ name: 'asc' });



--> Limiting and Skipping Results: You can limit the number of results and skip a specific number of documents.
Example - Model.find().limit(10).skip(5);



db.collection.find({
  field1: { $gt: 10 }, 
  field2: "value"
})

db.collection.find({
  $and: [
    { field1: { $gt: 10 } }, // field1 > 10
    { field2: "value" }      // field2 == "value"
  ]
})


db.collection.find({
  $or: [
    { field1: { $gt: 10 } },  // field1 > 10
    { field2: "value" }       // field2 == "value"
  ]
})


db.collection.find({
  $and: [
    { field1: { $gt: 10 } },   // field1 > 10
    { $or: [                   // field2 == "value" OR field3 == true
        { field2: "value" },
        { field3: true }
      ]
    }
  ]
})


db.collection.find({
  price: {
    $gte: 100, // Minimum price
    $lte: 500  // Maximum price
  }
})


db.collection.find({
  $and: [
    { price: { $gte: 100, $lte: 500 } },  // Price between 100 and 500
    { category: "electronics" }          // Additional filter: category is "electronics"
  ]
})


db.collection.find({
  $or: [
    { price: { $gte: 100, $lte: 500 } },  // Price between 100 and 500
    { price: { $gte: 1000, $lte: 1500 } } // OR price between 1000 and 1500
  ]
})



const addCondition = [
    {
        deleted_at : null, 
    }
];

const orCondition = [];

if(request.body.order != undefined){
    if(request.body.order != ''){
        orCondition.push({ order : request.body.order })
    }
}

if(request.body.name != undefined){
    if(request.body.name != ''){
        orCondition.push({ name : request.body.name })
    }
}

if(addCondition.length > 0){
    var filter = { $and : addCondition }
} else {
    var filter = {}
}

if(orCondition.length > 0){
    filter.$or = orCondition;
}

console.log(filter);

const categoryData = await categoryModel.find(filter)







.select('name image status order')


--> Regular Expressions: Find documents matching a pattern.
Example - var nameRegex = new RegExp("^" + request.body);
Model.find({ name: nameRegex });
new RegExp(request.body.name,"i")



--> Projection (Selecting Specific Fields):
Example - Model.find({}, 'name age');


--> Element Operators:
$exists: Matches documents that have the specified field.
$type: Matches documents where the value of the field is of the specified type.
Example:
Model.find({role: { $exists: true } });
Model.find({role: { $type: 2 } });


Double: 1
String: 2
Object: 3
Array: 4
Binary data: 5
Undefined: 6
ObjectId: 7
Boolean: 8
Date: 9
Null: 10
Regular Expression: 11
JavaScript: 13
Symbol: 14
JavaScript (with scope): 15
32-bit integer: 16
Timestamp: 17
64-bit integer: 18
Decimal128: 19
Min key: -1
Max key: 127


aggregate([
  {
    $group: {
      _id: '$name', // Group by the 'name' field
      count: { $sum: 1 }, // Count the number of documents in each group
      books: { $push: '$$ROOT' }, // Push the entire document to the 'books' array
    },
  },
])

const productCount = await coursesModel.aggregate([
        { $group: { _id: null, totalSum: { $sum: "$price" } } }
      ]);


33. Image Upload


34. APIS in MySQL

- npm i init -y
- npm i mysql
- npm i express

const express = require('express');

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('',(request,response) => {
    response.send('Server is working fine.');
});


app.use((request,response,next) => {
  var arr = {
    'status': false,
    'message': 'Oops, Something went wrong !!',
  };

  response.status(404).send(arr);
});

app.listen(3001);



npm i sequalize
npi i mysql2



1. JWT Authetication

- npm init -y
- npm i express
- npm i jsonwebtoken
- npm i bcrypt
- npm i sequalize
- npi i mysql2
- npm i express-validator


const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};


var totalRecords = await Model.countDocuments();

var totalProducts = await Model.aggregate([
    { $count : 'totalRecords' }
]);


var totalProducts = await productModel.aggregate(
   [
       {
           $group:{
               _id: "",
               minPrice: { $min: "$sale_price" },
               maxPrice: { $max: "$sale_price" },
               avgPrice: { $avg: "$sale_price" },
               sumPrice: { $sum: "$sale_price" }
           }
       }
   ]
)
