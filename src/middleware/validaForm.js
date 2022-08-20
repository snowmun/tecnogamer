const { badRequest } = require("../helpers/http");

const inputs = ['nombreProducto','stock','precio','descripcion'];

const validaForm = (req,res,next) => {
    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if(req.body[element].length <= 0){
            return badRequest(res, `${element} no debe estar vacío`, element);
        }
    }
    next();
    }

module.exports = {validaForm};
