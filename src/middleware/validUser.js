const http = require('../helpers/http');

const validarUser = (req, res, next) => {
    try {

        const { token } = req.headers;

        const { rol } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

        if (rol !== 2) {
            return http.badRequest(res, 'Acceso denegado', [], 403);
        }

        next();
    } catch (error) {
        return http.internalError(res, "Error interno", error.message);
    }
}

module.exports = { validarUser }