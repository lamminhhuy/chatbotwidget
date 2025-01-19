import { ReasonStatusCode } from "../types/reasonStatusCode";
import { StatusCode } from "../types/statusCode";

export class ErrorsResponse extends Error {

    statusCode:StatusCode
    constructor (message: ReasonStatusCode  ,statusCode: StatusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

class ConflictResponseError extends ErrorsResponse {
    constructor (message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}

class ForbiddenResponseError extends ErrorsResponse {
    constructor (message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadRequestResponseError extends ErrorsResponse {
    constructor (message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode);
    }
}

class AuthFailureResponseError extends ErrorsResponse {
    constructor (message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class NotFoundResponseError extends ErrorsResponse {
    constructor (message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode);
    }
}

 export default {
    ConflictResponseError,
    ForbiddenResponseError, 
    BadRequestResponseError,
    AuthFailureResponseError,
    NotFoundResponseError
}