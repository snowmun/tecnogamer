const {sendOk,internalError} = require('../helpers/http');

const upload = (req, res) =>{
    try {
        if(req.file){
            return  sendOk(res,'Imagen cargada',req.file.filename);
        }

        return sendOk(res,'No hay imagen para cargar','');

    } catch (error) {
        return internalError(res,'Error interno',error);
    }
}

module.exports = {
    upload
}