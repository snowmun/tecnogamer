const { badRequest } = require("../helpers/http");

const inputs = ['nombre', 'rut', 'correo', 'apellido', 'contrasena'];

const validaForm = (req, res, next) => {
    for (const input of inputs) {
        if (req.body[input].length <= 0) {
            return badRequest(res, `${input} no debe estar vacío`, input);
        }
    }
    next();
}

module.exports = { validaForm };
