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