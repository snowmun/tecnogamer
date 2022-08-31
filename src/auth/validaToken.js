const http = require('../helpers/http')
const jwt = require('jsonwebtoken');

const validarTokenRequest = (req,res,next) =>{

    const statusCodeErr = 401
    const statusTextErr = 'Unauthorized'
    if (req.headers.hasOwnProperty('x-access-token') && req.headers['x-access-token'].length > 0) {
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
            if (err) {
                http.badRequest(res,"TOKEN INVALIDO",[]);
            } else {
                return next();
            }
        });
    } else {
        http.badRequest(res,"Token de acceso no encontrado",[]);
    }
    
}

module.exports = {
    validarTokenRequest,
};