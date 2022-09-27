const { sendOk, internalError } = require('../helpers/http');

const upload = (req, res) => {
    try {
        const { img64 } = req.body;

        const bas64 = img64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

        const extension = img64.split(';')[0].split('/')[1];

        sendOk(res, 'Archivo procesada correcctamente', { bas64, extension });

    } catch (error) {
        return internalError(res, 'Error interno', error);
    }
}

module.exports = {
    upload
}