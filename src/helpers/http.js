
const sendOk = (res, message, result, code = 200) => {
    return res.status(code).json({
        status: true,
        message,
        Data: result,
    });
}


const badRequest = (res, message, result, code = 400) => {
    return res.status(code).json({
        status: false,
        message,
        Data: result
    });
}

const internalError = (res, message, result, code = 500) => {
    return res.status(code).json({
        status: false,
        message,
        Data: result
    });
}

module.exports = {
    sendOk,
    badRequest,
    internalError
}
