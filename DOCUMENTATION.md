# API documentation

- [API documentation](#api-documentation)
  - [User methods](#user-methods)
    - [Registration](#registration)
    - [Login](#login)
    - [Get user's rooms](#get-users-rooms)
  - [Room methods](#room-methods)
    - [Get all rooms](#get-all-rooms)
    - [Get room members](#get-room-members)
    - [Create a room](#create-a-room)
    - [Add user to a room](#add-user-to-a-room)
    - [Delete a room](#delete-a-room)
  - [Message methods](#message-methods)
    - [Send a message](#send-a-message)
    - [Get user's received messages](#get-users-received-messages)
    - [Get user's sent messages](#get-users-sent-messages)
    - [Get room messages](#get-room-messages)

## User methods

### Registration

Method: POST

URL: <https://dev-cord.herokuapp.com/api/users>

Example request body:

```json
{
  "username": "user",
  "email": "email@mail.com",
  "password": "password1"
}
```

Example response:

```json
{
  "success": true,
  "user": {
    "rooms": [],
    "_id": "5ec0910e1d052e4039e852af",
    "username": "user",
    "email": "email@mail.com",
    "createdAt": "2020-05-17T01:19:10.438Z",
    "updatedAt": "2020-05-17T01:19:10.438Z",
    "__v": 0
  }
}
```

### Login

Method: PUT

URL: <https://dev-cord.herokuapp.com/api/users>

Example request body:

```json
{
  "login": "user",
  "password": "password11"
}
```

Example response:

```json
{
  "success": true,
  "message": "Logged in",
  "accessToken": "eyJhbGciOiJIUzwrre34GiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzA5MTBlMWQwNTJlMDAyNGU4NTJhZiIsImlhdCI6MTU4OTY3545tTGMX0.1Q5G22Cke99IMap_BG72dslkffY-udSVnX5m5VOB6EemxI",
  "username": "user"
}
```

### Get user's rooms

Method: GET

URL: <https://dev-cord.herokuapp.com/api/users/rooms>

Expects a JSON Web Token in the Auth header as bearer token

Example response:

```json
{
  "success": true,
  "rooms": [
    "javascript"
  ]
}
```

## Room methods

### Get all rooms

Method: GET

URL: <https://dev-cord.herokuapp.com/api/users/rooms/user>

Example response:

```json
[
  {
    "members": [
      "5ec0910e1d052e0024e852ff"
    ],
    "_id": "5ec0930sfbcc27002463ad53",
    "name": "javascript",
    "owner": "5ec0910e1d052e0024e852ff",
    "createdAt": "2020-05-17T01:27:43.132Z",
    "updatedAt": "2020-05-17T01:27:43.132Z",
    "__v": 0
  },
  {
    "members": [
      "5ec0910e1d052e0024e852ff"
    ],
    "_id": "5ec0931f9bcc27002463ad54",
    "name": "rust",
    "owner": "5ec0910e1d052e0024e852ff",
    "createdAt": "2020-05-17T01:27:59.771Z",
    "updatedAt": "2020-05-17T01:27:59.771Z",
    "__v": 0
  }
]
```

### Get room members

Method: GET

URL: <https://dev-cord.herokuapp.com/api/rooms/javascript>

Example response:

```json
{
  "success": true,
  "members": [
    "user1",
    "user2"
  ]
}
```

### Create a room

Method: POST

URL: <https://dev-cord.herokuapp.com/api/rooms>

Expects a JSON Web Token in the Auth header as bearer token

Example request body:

```json
{
  "name": "lisp",
  "owner": "user"
}
```

Example response:

```json
{
  "success": true,
  "room": {
    "members": [
      "5ec0910e1d052fg024e852af"
    ],
    "_id": "5ec096cdc73ea4002494f9bb",
    "name": "lisp",
    "owner": "5ec0910e1d052fg024e852af",
    "createdAt": "2020-05-17T01:43:41.467Z",
    "updatedAt": "2020-05-17T01:43:41.467Z",
    "__v": 0
  }
}
```

### Add user to a room

Method: PUT

URL: <https://dev-cord.herokuapp.com/api/rooms>

Expects a JSON Web Token in the Auth header as bearer token

Example request body:

```json
{
  "room": "lisp",
  "username": "user2"
}
```

Example response:

```json
{
  "success": true,
  "message": "user2 added to lisp"
}
```

### Delete a room

Method: DELETE

URL: <https://dev-cord.herokuapp.com/api/rooms>

Expects a JSON Web Token in the Auth header as bearer token

Example request body:

```json
{
  "room": "lisp",
  "username": "user"
}
```

Example response:

```json
{
  "success": true,
  "message": "Room deleted"
}
```

## Message methods

### Send a message

Method: POST

URL: <https://dev-cord.herokuapp.com/api/messages>

Expects a JSON Web Token in the Auth header as bearer token

Example request body:

```json
{
  "from": "user1",
  "to": "javascript",
  "message": "hi"
}
```

Example response:

```json
{
  "success": true,
  "message": {
    "_id": "5ec09588c7a7a4662494f9ba",
    "from": "5ebc3ca911ef8e0024ce3c51",
    "to": "5ec0910e1d052fT024e852af",
    "message": "hi",
    "createdAt": "2020-05-17T01:38:16.858Z",
    "updatedAt": "2020-05-17T01:38:16.858Z",
    "__v": 0
  }
}
```

### Get user's received messages

Method: GET

URL: <https://dev-cord.herokuapp.com/api/messages/received>

Expects a JSON Web Token in the Auth header as bearer token

Example response:

```json
{
  "success": true,
  "messages": [
    {
      "from": "user2",
      "message": "hey",
      "sentAt": "2020-05-17T01:37:52.331Z"
    }
  ]
}
```

### Get user's sent messages

Method: GET

URL: <https://dev-cord.herokuapp.com/api/messages/sent>

Expects a JSON Web Token in the Auth header as bearer token

Example response:

```json
{
  "success": true,
  "messages": [
    {
      "to": "javascript",
      "message": "hi",
      "sentAt": "2020-05-17T01:37:19.993Z"
    },
    {
      "to": "user2",
      "message": "hey, how are you?",
      "sentAt": "2020-05-17T01:37:42.483Z"
    }
  ]
}
```

### Get room messages

Method: GET

URL: <https://dev-cord.herokuapp.com/api/messages/javascript>

Example response:

```json
{
  "success": true,
  "messages": [
    {
      "from": "user1",
      "message": "hi",
      "sentAt": "2020-05-16T04:25:41.700Z"
    },
    {
      "from": "user2",
      "message": "how do i find an item in an array?",
      "sentAt": "2020-05-16T04:25:45.772Z"
    }
  ]
}
```
