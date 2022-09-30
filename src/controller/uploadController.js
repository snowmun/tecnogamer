const { sendOk, internalError } = require('../helpers/http');

const upload = (req, res) => {
    try {
        const { img64 } = req.body;

        let bas64 = '';

        let extension = '';

        if (img64.length > 0) {

            bas64 = img64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

            extension = img64.split(';')[0].split('/')[1];

            return sendOk(res, 'Archivo procesada correcctamente', { bas64, extension });
        }

        return sendOk(res, 'Archivo procesada correcctamente', { bas64, extension });

    } catch (error) {
        return internalError(res, 'Error interno', error);
    }
}

module.exports = {
    upload
}