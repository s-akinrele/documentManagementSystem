
[![Build Status](https://travis-ci.org/andela-oakinrele/documentManagementSystem.svg?branch=develop)](https://travis-ci.org/andela-oakinrele/documentManagementSystem)
[![Coverage Status](https://coveralls.io/repos/github/andela-oakinrele/documentManagementSystem/badge.svg?branch=develop)](https://coveralls.io/github/andela-oakinrele/documentManagementSystem?branch=develop)
# Document Management System 

Document Management System API contains several API end points that allows users to create, edit, retrieve and delete documents. It also offers a way to ensure that only authorized users can perform certain operations.

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `git clone https://github.com/andela-oakinrele/documentManagementSystem.git`
3.  Change your directory `cd documentManagementSystem`
4.  Install all dependencies `npm install`
5.  Run tests  `npm test`
6.  Run integration test `npm run e2e`
7.  Start the app `npm start` and use [postman](https://www.getpostman.com/) to consume the API


## API ENDPOINTS
**Users**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
PATCH | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
GET| [/users/documents](#get-usersdoc) | To get a users personal documents
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
GET| [/users/search/:email](#get-userbyemail) | To get a user by email
PUT| [/users/:id/password](#reset-password) | To reset users password

**Roles**

Request type | Endpoint | Action 
------------ | -------- | ------
POST | [/roles](#create-role) | Create a new role
GET | [/roles](#get-roles) | Get all created roles
PUT | [/role/:id](#update-role) | To edit a role
PATCH | [/role/:id](#update-role) | To edit a role
GET | [/role/:id](#get-a-role) | To get a role

**Documents**

Request type | Endpoint | Action 
------------ | -------- | ------ 
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents 
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Remove a specific document from storage
GET | [/documents??offset=1&limit=10](#get-documents) | Retrieve maximum of first 10 documents
GET | [/accessible/documents](#get-accessible-documents) | Retrieve documents created by other users that are public and on the role level
GET | [/documents/access/private](#get-private-doc) | Gets documents that has been share privately with the user

**Search**

Request type | Endpoint | Action 
------------ | -------- | ------
GET | [/search/users](#search-user) | Search for a user
GET | [/search/documents/](#search-document) | Search for a document

Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "username": "Ada",
    "firstname": "Addnana",
    "lastname": "Ada",
    "email": "ada@gmail.com",
    "password":"password"
}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "expiresIn": "10h",
  "user": {
    "id": 15,
    "username": "Ada",
    "firstname": "Addnana",
    "lastname": "Ada",
    "email": "ada@gmail.com",
    "password": "$2a$10$.jAF5xr2IGeZDyUOsivN2etYd8HaUPwvVc3bjPlI0quQEZy5yexN2",
    "RoleId": 2,
    "updatedAt": "2017-04-03T12:19:45.740Z",
    "createdAt": "2017-04-03T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Requires `Authorization` header to be set
#### Response
```
{
  "paginationMeta": {
    "totalCount": 13,
    "pageSize": 8,
    "pageCount": 2,
    "currentPage": 1
  },
  "result": [
    {
      "id": 1,
      "username": "simi",
      "firstname": "Simisola",
      "lastname": "Akinrele",
      "email": "akinrelesimi@gmail.com",
      "password": "$2a$10$J/1mi4mPbP4XwEGJSknwlOS1/luSdiTlXueor5GoYO7eWnaXN4fZ.",
      "RoleId": 1,
      "createdAt": "2017-04-02T16:47:41.251Z",
      "updatedAt": "2017-04-02T16:47:41.251Z"
    },
    {
      "id": 4,
      "username": "dede",
      "firstname": "Dedele",
      "lastname": "Adebiyi",
      "email": "dede@gmail.com",
      "password": "$2a$10$kWVzQ1qR/DXeYhkhURQMQ.wq0fDj5z1ndqcgVceAOGpA7sQbItpsa",
      "RoleId": 2,
      "createdAt": "2017-04-02T16:47:41.251Z",
      "updatedAt": "2017-04-02T16:47:41.251Z"
    },
    {
      "id": 2,
      "username": "barbie",
      "firstname": "Barbara",
      "lastname": "Ezomo",
      "email": "barbara@gmail.com",
      "password": "simisola",
      "RoleId": 2,
      "createdAt": "2017-04-02T16:47:41.251Z",
      "updatedAt": "2017-04-02T21:22:08.187Z"
    },
    {
      "id": 5,
      "username": "seyi",
      "firstname": "Seyi",
      "lastname": "Adebiyi",
      "email": "seyi@gmail.com",
      "password": "$2a$10$T2K8zrYS2zMADhzf4yd17eBV7q3VEG7ZDVuWGWLtEtvKFXnCgV5/C",
      "RoleId": 1,
      "createdAt": "2017-04-02T16:47:41.251Z",
      "updatedAt": "2017-04-03T10:56:58.067Z"
    },
    {
      "id": 6,
      "username": "Jaylin_Harberdd",
      "firstname": "Bertsss",
      "lastname": "Jastsss",
      "email": "simisoola@gmail.com",
      "password": "$2a$10$YhkR1owE9.NT7AM27293VeimpYAQSe/6M976p5EDc7QprPL18z.eK",
      "RoleId": 1,
      "createdAt": "2017-04-02T16:48:03.390Z",
      "updatedAt": "2017-04-02T22:04:50.756Z"
    },
    {
      "id": 7,
      "username": "bola",
      "firstname": "Bolarinwa",
      "lastname": "Adetayo",
      "email": "rere@gmail.com",
      "password": "$2a$10$jH3g1lbWeDcHBnKUVI/qQ.i9lalNI88lXTqUOQ.4DA4n05b8a3d36",
      "RoleId": 2,
      "createdAt": "2017-04-02T16:48:17.033Z",
      "updatedAt": "2017-04-02T16:48:17.033Z"
    },
    {
      "id": 8,
      "username": "Jayde_Sanford",
      "firstname": "Carlie",
      "lastname": "Hintz",
      "email": "Wilmer.Von@gmail.com",
      "password": "$2a$10$Pl1Cu3yCcuOmOldt3nLOQ.wLE3D.LFSk4hVL877Ub7h7M44KicHH6",
      "RoleId": 1,
      "createdAt": "2017-04-02T16:48:17.753Z",
      "updatedAt": "2017-04-02T16:48:17.753Z"
    },
    {
      "id": 9,
      "username": "Leif.King19",
      "firstname": "Christiana",
      "lastname": "Conn",
      "email": "Rogelio77@yahoo.com",
      "password": "$2a$10$zTl51.Osql6gkdHBfHuBxePTNbz1CJvoiRk/VOTcMY3xGFO0cN9VC",
      "RoleId": 2,
      "createdAt": "2017-04-02T16:48:18.297Z",
      "updatedAt": "2017-04-02T16:48:18.297Z"
    }
  ]
}
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
    "id": 8,
    "username": "Jayde_Sanford",
    "firstname": "Carlie",
    "lastname": "Hintz",
    "email": "Wilmer.Von@gmail.com",
    "password": "$2a$10$Pl1Cu3yCcuOmOldt3nLOQ.wLE3D.LFSk4hVL877Ub7h7M44KicHH6",
    "RoleId": 1,
    "createdAt": "2017-04-02T16:48:17.753Z",
    "updatedAt": "2017-04-02T16:48:17.753Z"
}
```
## Update user
#### Request
  - Enpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "RoleId": 2
}
```
#### Response
```
{
  "id": 8,
  "username": "Jayde_Sanford",
  "firstname": "Carlie",
  "lastname": "Hintz",
  "email": "Wilmer.Von@gmail.com",
  "password": "$2a$10$Pl1Cu3yCcuOmOldt3nLOQ.wLE3D.LFSk4hVL877Ub7h7M44KicHH6",
  "RoleId": 2,
  "createdAt": "2017-04-02T16:48:17.753Z",
  "updatedAt": "2017-04-03T12:30:50.315Z"
}
```

## Delete user
#### Request
  - Enpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "Delete successful"
}
```

## User login
### Request 
 - Endpoint: **POST**: `/users/login`
```
{
    "email": "akinrelesimi@gmail.com",
    "password":"password"
}
``` 

### Response 
``` 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsIkVtYWlsIjoiYWtpbnJlbGVzaW1pQGdtYWlsLmNvbSIsIlJvbGVJZCI6MSwiaWF0IjoxNDkxMjIyNzQ2LCJleHAiOjE0OTEyNTg3NDZ9.YA3vFPmoCoVM_z9ykCUuT-V7yAlRHQfTY1pFgr4DcZI",
  "user": {
    "id": 1,
    "username": "simi",
    "firstname": "Simisola",
    "lastname": "Akinrele",
    "email": "akinrelesimi@gmail.com",
    "password": "$2a$10$J/1mi4mPbP4XwEGJSknwlOS1/luSdiTlXueor5GoYO7eWnaXN4fZ.",
    "RoleId": 1,
    "createdAt": "2017-04-02T16:47:41.251Z",
    "updatedAt": "2017-04-02T16:47:41.251Z"
  }
}
```

# Get Logged-in user's Document 
### Request
  - Enpoint: **GET**: `/users/documents`
  - Requires `Authorization` header to be set
  
### Response 
```
{
  "paginationMeta": {
    "totalCount": 4,
    "pageSize": 8,
    "pageCount": 1,
    "currentPage": 1
  },
  "result": [
    {
      "id": 1,
      "title": "hey there",
      "content": "<p>ea reiciendis fuga</p>",
      "OwnerId": 1,
      "access": "private",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T20:35:06.436Z"
    },
    {
      "id": 4,
      "title": "meal ",
      "content": "<p>et ratione earum</p>",
      "OwnerId": 1,
      "access": "role",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T20:38:10.399Z"
    },
    {
      "id": 13,
      "title": "ddd",
      "content": "<p>simi</p>",
      "OwnerId": 1,
      "access": "private",
      "createdAt": "2017-04-02T20:20:16.614Z",
      "updatedAt": "2017-04-03T10:04:25.359Z"
    },
    {
      "id": 15,
      "title": "bla bla",
      "content": "<p>A random text to test how things are working</p>",
      "OwnerId": 1,
      "access": "public",
      "createdAt": "2017-04-02T20:34:02.046Z",
      "updatedAt": "2017-04-02T20:34:02.046Z"
    }
  ]
}
```

# Search for a user with email 
### Request
  - Enpoint: **GET**: `/users/search/:email`
  - Requires `Authorization` header to be set

### Response 

```
{
  "id": 15,
  "username": "Ada",
  "firstname": "Addnana",
  "lastname": "Ada",
  "email": "ada@gmail.com",
  "password": "$2a$10$.jAF5xr2IGeZDyUOsivN2etYd8HaUPwvVc3bjPlI0quQEZy5yexN2",
  "RoleId": 1,
  "createdAt": "2017-04-03T12:19:45.740Z",
  "updatedAt": "2017-04-03T12:19:45.740Z"
}
```

# Update password 
### Request
  - Enpoint: **PUT**: `/users/:id/password`
  - Requires `Authorization` header to be set

Body (application/json)
```
{
    "oldPassword": "password",
    "newPassword": "simisola",
    "confirmPassword": "simisola"
}
``` 

### Response

```
{
    "message": "Password Update successful"
}
```

ROLES
-----
## Create Role
#### Request
  - Endpoint **POST** `/roles`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "Admin"
}
```
#### Response
Body (application/json)
```
{
  status: 201,
  message: 'Successfully created'
}
```

## Get Roles
#### Request
  - Endpoint **GET** `/roles`
  - Requires `Authorization` header to be set

#### Response
Body (application/json)
```
[
  {
    "id": 1,
    "title": "Admin",
    "createdAt": "2017-04-02T16:47:40.183Z",
    "updatedAt": "2017-04-02T16:47:40.183Z"
  },
  {
    "id": 2,
    "title": "User",
    "createdAt": "2017-04-02T16:47:40.183Z",
    "updatedAt": "2017-04-02T16:47:40.183Z"
  }
]
```

## Update Role
#### Request
  - Endpoint **POST** `/roles/:id`
  - Requires `Authorization` header to be set
Body (application/json)
```
{
  "title": "Account Manager"
}
```
#### Response
Body (application/json)
```
{
  "id": 6,
  "title": "Account Manager",
  "createdAt": "2017-04-02T16:47:40.183Z",
  "updatedAt": "2017-04-03T13:30:46.792Z"
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "Marvel",
  "content": "Diary of a movie addict"
}
```
#### Response
  - Body `(application/json)`
```
{
  "access": "public",
  "id": 19,
  "title": "Marvel",
  "content": "Diary of a movie addict",
  "OwnerId": 1,
  "updatedAt": "2017-04-03T13:32:34.887Z",
  "createdAt": "2017-04-03T13:32:34.887Z"
}
```
## Get Document
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **page** (for the page number) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
{
  "paginationMeta": {
    "totalCount": 11,
    "pageSize": 8,
    "pageCount": 2,
    "currentPage": 1
  },
  "result": [
    {
      "id": 1,
      "title": "hey there",
      "content": "<p>ea reiciendis fuga</p>",
      "OwnerId": 1,
      "access": "private",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T20:35:06.436Z"
    },
    {
      "id": 5,
      "title": "bread ",
      "content": "bread and beans",
      "OwnerId": 2,
      "access": "role",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T16:47:41.262Z"
    },
    {
      "id": 4,
      "title": "meal ",
      "content": "<p>et ratione earum</p>",
      "OwnerId": 1,
      "access": "role",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T20:38:10.399Z"
    },
    {
      "id": 3,
      "title": "new doc ",
      "content": "This is my test second data",
      "OwnerId": 2,
      "access": "private",
      "createdAt": "2017-04-02T16:47:41.262Z",
      "updatedAt": "2017-04-02T16:47:41.262Z"
    },
    {
      "id": 7,
      "title": "debitis",
      "content": "culpa laudantium dolores",
      "OwnerId": 6,
      "access": "public",
      "createdAt": "2017-04-02T16:48:16.975Z",
      "updatedAt": "2017-04-02T16:48:16.975Z"
    },
    {
      "id": 8,
      "title": "Multi-lateral high-level artificial intelligence",
      "content": "Et aperiam laudantium et est cum architecto. Et architecto velit est voluptas. Sit impedit eveniet sit magnam aut.",
      "OwnerId": 6,
      "access": "private",
      "createdAt": "2017-04-02T16:48:16.987Z",
      "updatedAt": "2017-04-02T16:48:16.987Z"
    },
    {
      "id": 9,
      "title": "Fundamental tertiary project",
      "content": "Vel maiores quis dicta quos eos nisi sunt qui. Velit qui architecto accusantium cupiditate aliquid dignissimos doloremque porro. Sit est nostrum sed quas iste quia. Eaque itaque dolores aut cum dolorem ipsam.",
      "OwnerId": null,
      "access": "public",
      "createdAt": "2017-04-02T16:48:19.786Z",
      "updatedAt": "2017-04-02T16:48:19.786Z"
    },
    {
      "id": 13,
      "title": "ddd",
      "content": "<p>simi</p>",
      "OwnerId": 1,
      "access": "private",
      "createdAt": "2017-04-02T20:20:16.614Z",
      "updatedAt": "2017-04-03T10:04:25.359Z"
    }
  ]
}
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
  "id": 4,
  "title": "meal ",
  "content": "<p>et ratione earum</p>",
  "OwnerId": 1,
  "access": "role",
  "createdAt": "2017-04-02T16:47:41.262Z",
  "updatedAt": "2017-04-02T20:38:10.399Z"
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "The accountant",
  "content": "J.K simmons was in the movie as well as Ben Affleck, one of my fav"
}
```
##### Response
```
{
  "id": 4,
  "title": "The accountant",
  "content": "J.K simmons was in the movie as well as Ben Affleck, one of my fav",
  "OwnerId": 1,
  "access": "role",
  "createdAt": "2017-04-02T16:47:41.262Z",
  "updatedAt": "2017-04-02T20:38:10.399Z"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  status: 200,
  message: 'Delete Successful'
}
```

## Get Accessible Documents
#### Request
  - Endpoint **GET** `/accessible/documents`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 19,
    "title": "DEDE",
    "content": "This is my document",
    "OwnerId": 1,
    "access": "public"
  },
  {
    "id": 4,
    "title": "meal ",
    "content": "<p>et ratione earum</p>",
    "OwnerId": 1,
    "access": "role"
  },
  {
    "id": 15,
    "title": "bla bla",
    "content": "<p>A random text to test how things are working</p>",
    "OwnerId": 1,
    "access": "public"
  },
  {
    "id": 7,
    "title": "debitis",
    "content": "culpa laudantium dolores",
    "OwnerId": 6,
    "access": "public"
  }
]
```

## Get Documents that were private shared with user
#### Request
  - Endpoint **GET** `/documents/access/private`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 3,
    "title": "new doc ",
    "content": "This is my test second data",
    "OwnerId": 2,
    "access": "private",
    "createdAt": "2017-04-02T16:47:41.262Z",
    "updatedAt": "2017-04-02T16:47:41.262Z"
  },
  {
    "id": 18,
    "title": "Simisola",
    "content": "<p>Hi simi,</p>\n<p>This is Seyi.&nbsp;</p>\n<p>i am sharing a private message with you&nbsp;</p>",
    "OwnerId": 5,
    "access": "private",
    "createdAt": "2017-04-03T10:58:09.488Z",
    "updatedAt": "2017-04-03T10:58:09.488Z"
  }
]
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?q=simi`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 1,
    "username": "simi",
    "firstname": "Simisola",
    "lastname": "Akinrele",
    "email": "akinrelesimi@gmail.com",
    "password": "$2a$10$J/1mi4mPbP4XwEGJSknwlOS1/luSdiTlXueor5GoYO7eWnaXN4fZ.",
    "RoleId": 1,
    "createdAt": "2017-04-02T16:47:41.251Z",
    "updatedAt": "2017-04-02T16:47:41.251Z"
  },
  {
    "id": 6,
    "username": "Jaylin_Harberdd",
    "firstname": "Bertsss",
    "lastname": "Jastsss",
    "email": "simisoola@gmail.com",
    "password": "$2a$10$YhkR1owE9.NT7AM27293VeimpYAQSe/6M976p5EDc7QprPL18z.eK",
    "RoleId": 1,
    "createdAt": "2017-04-02T16:48:03.390Z",
    "updatedAt": "2017-04-02T22:04:50.756Z"
  }
]
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?q=simi`
  - Requires `Authorization` header to be set
#### Response
```
[
  {
    "id": 13,
    "title": "ddd",
    "content": "<p>simi</p>",
    "OwnerId": 1,
    "access": "private",
    "createdAt": "2017-04-02T20:20:16.614Z",
    "updatedAt": "2017-04-03T10:04:25.359Z"
  },
  {
    "id": 18,
    "title": "Simisola",
    "content": "<p>Hi simi,</p>\n<p>This is Seyi.&nbsp;</p>\n<p>i am sharing a private message with you&nbsp;</p>",
    "OwnerId": 5,
    "access": "private",
    "createdAt": "2017-04-03T10:58:09.488Z",
    "updatedAt": "2017-04-03T10:58:09.488Z"
  }
]
```