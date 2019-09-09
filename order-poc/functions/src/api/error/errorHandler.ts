
export const createErrorResponse = (errorMessage) => {
    return {
        "statusCode": 500,
        "status": "FAILURE",
        "error": {
            "message": errorMessage,
            "errorCode": "APPLICATION_ERROR",
            "errorLevel": "ERROR"
        }
    };
};

export const createUnautorizedError = (errorMessage) => {
    return {
        "statusCode": 403,
        "status": "FAILURE",
        "error": {
            "message": errorMessage,
            "errorCode": "UNAUTHORIZED",
            "errorLevel": "ERROR"
        }
    };
};