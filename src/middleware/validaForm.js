const { badRequest } = require("../helpers/http");

const inputsRegister = ['nombre', 'rut', 'correo', 'apellido', 'contrasena'];

const inputsProduct = ['nombreProducto', 'stock', 'precio'];

const validaFormRegister = (req, res, next) => {
    for (const input of inputsRegister) {
        if (req.body[input].length <= 0) {
            return badRequest(res, `${input} no debe estar vacío`, input);
        }
    }
    next();
}

const validaFormProduct = (req, res, next) => {
    for (const input of inputsProduct) {
        if (req.body[input].length <= 0) {
            return badRequest(res, `${input} no debe estar vacío`, input);
        }
    }
    next();
}

module.exports = { validaFormRegister, validaFormProduct };
