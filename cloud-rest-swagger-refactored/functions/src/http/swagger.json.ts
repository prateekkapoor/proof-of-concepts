export const swagger = {
  "swagger": "2.0",
  "info": {
    "description": "Order Rest API",
    "version": "1.0.0",
    "title": "Swagger OrderStore",
    "termsOfService": "",
    "contact": {
      "email": "abc@xyz.com"
    },
    "license": {
      "name": "",
      "url": "http://localhost"
    }
  },
  "host": "seismic-box-2116.firebaseapp.com",
  "basePath": "/store/v1",
  "tags": [
    {
      "name": "order",
      "description": "order rest api",
      "externalDocs": {
        "description": "Find out more",
        "url": "seismic-box-2116.firebaseapp.com"
      }
    }
  ],
  "schemes": [
    "https"
  ],
  "paths": {
    "/order": {
      "post": {
        "tags": [
          "order"
        ],
        "summary": "Add a order",
        "description": "",
        "operationId": "addOrder",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Order to be created",
            "required": true,
            "schema": {
              "$ref": "#/definitions/order"
            }
          }
        ],
        "responses": {
          "404": {
            "description": "Orders not found"
          },
          "405": {
            "description": "Invalid input"
          }
        }
      },
      "get": {
        "tags": [
          "order"
        ],
        "summary": "get all the order",
        "description": "get all the orders",
        "operationId": "getOrders",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/orders"
            }
          },
          "404": {
            "description": "Order not found"
          }
        }
      }
    },
    "/order/{orderId}": {
      "get": {
        "tags": [
          "order"
        ],
        "summary": "Find order by ID",
        "description": "Returns a single order",
        "operationId": "getOrderById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "description": "ID of order to return",
            "required": true,
            "type": "string",
            "format": "utf"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/order"
            }
          },
          "404": {
            "description": "Order not found"
          }
        }
      },
      "patch": {
        "tags": [
          "order"
        ],
        "summary": "Updates a order in the store with form data",
        "description": "",
        "operationId": "updateOrderById",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "description": "ID of order that needs to be updated",
            "required": true,
            "type": "string",
            "format": "utf"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Order to be updated",
            "required": true,
            "schema": {
              "$ref": "#/definitions/order"
            }
          }
        ],
        "responses": {
          "405": {
            "description": "Invalid input"
          }
        }
      },
      "delete": {
        "tags": [
          "order"
        ],
        "summary": "Deletes a order",
        "description": "",
        "operationId": "orderId",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "description": "Order id to delete",
            "required": true,
            "type": "string",
            "format": "utf"
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Order not found"
          }
        }
      }
    }
  },
  "definitions": {
    "order": {
      "type": "object",
      "properties": {
        "orderId": {
          "type": "string",
          "format": "utf"
        },
        "product": {
          "type": "string",
          "format": "utf"
        },
        "quantity": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "orders": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/order"
      }
    }
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  }
}