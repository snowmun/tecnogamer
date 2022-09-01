
const sendOk = (res, message, result, code = 200) => {
    res.status(code).json({  
        status:true,
        message,
        Data: result,
    });
}


const badRequest = (res, message, result, code = 400) => {
    res.status(code).json({  
        status:false,
        message,
        Data: result
    });
}

const internalError = (res, message, result, code = 500) => {
    res.status(code).json({  
        status:false,
        message,
        Data: result
    }); 
}

module.exports= {
    sendOk,
    badRequest,
    internalError
}
