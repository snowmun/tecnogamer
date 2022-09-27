const http = require('../helpers/http');
const jwt = require('jsonwebtoken');

const createToken = (req, res) => {
    try {

        const { apiKey } = req.body;

        if (apiKey) {

            const token = jwt.sign({ apiKey }, process.env.SECRET_TOKEN, { expiresIn: '1h' })

            req.headers['token'] = token;

            return http.sendOk(res, 'Acceso permitido', { "token": token, "origen": '' });

        } else {

            return http.badRequest(res, 'Acceso denegado', [], 403);
        }
    } catch (error) {
        return http.internalError(res, "Error interno", error);
    }
}

module.exports = { createToken };