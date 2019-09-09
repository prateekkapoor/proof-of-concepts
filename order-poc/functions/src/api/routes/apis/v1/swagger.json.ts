import { config } from '../../../../config.json';
const url = config.baseURL;

export const swagger = {
  "swagger": "2.0",
  "info": {
    "description": "order api",
    "version": "1.0.0",
    "title": "order-api",
  },
  "host": `${url}`,
  "basePath": "/order-service/api/v1",
  "tags": [
    {
      "name": "orders"
    },
  ],
  "securityDefinitions": {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "value": "abcd",
    },
  },
  "schemes": [
    "https"
  ],
  "security": [
    {
      "Bearer": []
    }
  ],


  "paths": {
    "/orders": {
      "post": {
        "tags": [
          "order"
        ],
        "security": [
          {
            "Bearer": []
          }
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
          "orders"
        ],
        "security": [
          {
            "Bearer": []
          }
        ],
        "summary": "Get orders",
        "description": "",
        "operationId": "getOrders",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string",
                  "example": "SUCCESS"
                },
                "statusCode": {
                  "type": "number",
                  "example": 200
                },
                "data": {
                  "$ref": "#/definitions/orders"
                }
              }
            }
          },
          "500": {
            "description": "Failed to fetch orders.",
            "schema": {
              "$ref": "#/definitions/500"
            }
          }
        }
      }

    },
    "/orders/{orderId}": {
      "get": {
        "tags": [
          "orders"
        ],
        "summary": "Get order by Id",
        "description": "",
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
              "type": "object",
              "properties": {
                "status": {
                  "type": "string",
                  "example": "SUCCESS"
                },
                "statusCode": {
                  "type": "number",
                  "example": 200
                },
                "data": {
                  "$ref": "#/definitions/order"
                }
              }
            }
          },
          "500": {
            "description": "Failed to fetch orders.",
            "schema": {
              "$ref": "#/definitions/500"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "orders": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/order"
      }
    },
    "order": {
      "type": "object",
      "properties": {
        "orderId": {
          "type": "string",
          "example": "E1y5DJ7x8j0RPQvfsCZ8"
        },
        "productName": {
          "type": "string",
          "example": "Test Product"
        },
        "quantity": {
          "type": "number",
          "example": 2
        },
        "price": {
          "type": "number",
          "example": 122.22
        },
        "description": {
          "type": "string",
          "example": "Test product description"
        }
      }
    },
    "500": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "example": "FAILURE"
        },
        "statusCode": {
          "type": "number",
          "example": 500
        },
        "error": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "API failed"
            },
            "errorCode": {
              "type": "string",
              "example": "APPLICATION_ERROR"
            },
            "errorLevel": {
              "type": "string",
              "example": "ERROR"
            }
          }
        }
      }
    }
  }
};
