const http = require("../helpers/http");
const jwt = require("jsonwebtoken");

const validarToken = (req, res) => {

    const statusCodeErr = 401;

    if (req.headers.hasOwnProperty('token') && req.headers['token'].length > 0) {
        const token = req.headers['token'];
        jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
            if (err) {
                return http.badRequest(res, "TOKEN INVALIDO", [], statusCodeErr);
            } else {
                return http.sendOk(res, "TOKEN VALIDO", true, 200);
            }
        });
    } else {
        return http.badRequest(res, "Token de acceso no encontrado", [], statusCodeErr);
    }
};

module.exports = {
    validarToken,
};
