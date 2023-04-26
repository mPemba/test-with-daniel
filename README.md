

## Description

All this app does is create users and get them lol 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev


## Test
$ npm test

```

## Testing plan

Using Postman we can create and getAll sample users

## POST
URL: localhost:3000/auth

Body:

```json
{
    "email": "ExampleEmail@gmail.com",
    "username": "username123",
    "password": "testing123"
}
```

Expected Response: 

```json
{
    "description": "User created successfully",
    "data": {
        "id": "15497446-bb2f-4c2d-9db0-0140ef856ccc",
        "email": "exampleemail@gmail.com",
        "username": "username123",
        "password": "$2b$10$EuGWryl1GBQX9heW5ZEblOGP.Ybln191KWsc3C.gJ9laL3D02Njfq"
    }
}
```


## GET
URL: localhost:3000/auth/all

Expected Response: 

```json
{
    "description": "Users found successfully",
    "data": [
        {
            "id": "123",
            "email": "existingemail@gmail.com",
            "username": "existingusername",
            "password": "password"
        },
        {
            "id": "15497446-bb2f-4c2d-9db0-0140ef856ccc",
            "email": "exampleemail@gmail.com",
            "username": "username123",
            "password": "$2b$10$EuGWryl1GBQX9heW5ZEblOGP.Ybln191KWsc3C.gJ9laL3D02Njfq"
        }
    ]
}
```

Nest is [MIT licensed](LICENSE).
