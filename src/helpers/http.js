
const sendOk = (res,message,result) =>{
    res.status(200).json({  
        "status":true,
        message,
        "Data": result,
    });
}


const badRequest = (res, message, result) =>{
    res.status(409).json({  
        "status":false,
        message,
        "Data": result
    });
}

const internalError = (res, message, result) => {
    res.status(500).json({  
        "status":false,
        message,
        "Data": result
    }); 
}

module.exports= {
    sendOk,
    badRequest,
    internalError
}
