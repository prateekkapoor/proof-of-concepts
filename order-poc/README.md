# order-poc
order-poc API to be consumed by other systems.
## Configuration
There is a section in the `firebase config object <https://firebase.google.com/docs/functions/config-env>`_
that we need to declare:
###  configuration object 

1.  Common configuration: Declare a dictionary with the configuration
    for common parameters. example:
    ```
        {
            "bucketName":  "<bucket-name>",
            "baseURL":  "<url>",
            "env": <environment>
        }
    ```    

## Setup
* Update bucket URL in `config-<env>.json` file
    ```
    "bucketName": "<bucket-name>"
    ```
* Update hosting URL in `config-<env>`.json file    
    ```
   "baseURL":  "<url>"
   ```
## Swagger End Point
```
URL: {
    "local": "https://first-firestore.firebaseapp.com/estation/api/v1/docs",
    "dev":   "https://first-firestore.firebaseapp.com/estation/api/v1/docs",
    "qa":    "https://first-firestore.firebaseapp.com/estation/api/v1/docs",
    "prod":  "https://first-firestore.firebaseapp.com/estation/api/v1/docs"
   
  }
 ``` 

## Deployment
Deploy commands defined in `functions/package.json` so you can
just run:
         
#### Deploy to lower environments
* `npm install` - install dependences
   
* `npm run deploy` - to deploy the codebase to the `local` environment
* `npm run deploy-dev` - to deploy it to Dev
* `npm run deploy-qa` - to deploy it to QA
*  `firebase serve` - to run functions locally. Swagger URL: http://URL/estation/api/v1/docs
#### Deploy to Prod

* `npm install` - install dependences
* `npm run deploy-prod` - to deploy to the production environment
The command will run some checks prior to uploading the function to firebase.
