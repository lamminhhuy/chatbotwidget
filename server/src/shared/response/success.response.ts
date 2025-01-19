enum SuccessStatus {
    OK = 200,
    CREATED =201
}

enum ReaonSuccessStatus {
    OK = "OK",
    CREATED = "Created"
}

class SuccessReponse {

    message: ReaonSuccessStatus;
    statusCode: SuccessStatus;
    constructor(message: ReaonSuccessStatus, statusCode: SuccessStatus) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

class CreatedResponse extends SuccessReponse {
    constructor(message: ReaonSuccessStatus = ReaonSuccessStatus.CREATED, statusCode: SuccessStatus = SuccessStatus.CREATED) {
        super(message, statusCode);
    }
}

class OkResponse extends SuccessReponse {
    constructor(message: ReaonSuccessStatus = ReaonSuccessStatus.OK, statusCode: SuccessStatus = SuccessStatus.OK) {
        super(message, statusCode);
    }
}

export default {
    CreatedResponse,
    OkResponse
}