const http = require('../helpers/http')
const jwt = require('jsonwebtoken');

const validarTokenRequest = (req,res,next) =>{

    // const statusCodeErr = 401
    // if (req.headers.hasOwnProperty('x-access-token') && req.headers['x-access-token'].length > 0) {
    //     const token = req.headers['x-access-token'];

    //     jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
    //         if (err) {
    //             http.badRequest(res,"TOKEN INVALIDO",[],statusCodeErr);
    //         } else {
    //             return next();
    //         }
    //     });
    // } else {
    //     http.badRequest(res,"Token de acceso no encontrado",[],statusCodeErr);
    // }
    next();
}

module.exports = {
    validarTokenRequest,
};