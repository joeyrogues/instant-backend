# Requirements

* node
* npm
* MongoDB

# How to?

Just fill in the routes and models you need in config.json and run node index.js

Example:
```json
{
  "routes": [
    {
      "model": {
        "name": "user",
        "attributes": {
          "firstname": "String",
          "lastname":  "String"
        }
      },
      "actions": ["list", "show", "create", "update", "patch", "delete"]
    }, {
       "model": {
         "name": "car",
         "attributes": {
           "type": "String",
           "price":  "String"
         }
       },
       "actions": ["list", "show", "create", "update", "patch", "delete"]
     }
  ]
}
```

The example above creates the models "User" and "Car".

Then run the server

```bash
node index.js
```

HAPI will listen on the following urls:
* For model Users
  * GET    /users
  * GET    /users/:id
  * POST   /users
  * POST   /users/:id
  * PATCH  /users/:id
  * UPDATE /users/:id
  * DELETE /users/:id
* For model Car
  * GET    /cars
  * GET    /cars/:id
  * POST   /cars
  * POST   /cars/:id
  * PATCH  /cars/:id
  * UPDATE /cars/:id
  * DELETE /cars/:id