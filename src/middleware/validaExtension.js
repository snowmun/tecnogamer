const { badRequest } = require("../helpers/http");

const extensionPermitida = ['png', 'jpg', 'jpeg'];

const validaExtension = (req, res, next) => {

    const { img64 } = req.body;

    let extension = img64.split(';')[0].split('/')[1];

    if (!extensionPermitida.includes(extension)) {
        switch (extension) {
            case 'plain':
                extension = 'txt';
                break;
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                extension = 'docx';
                break;
        }
        return badRequest(res, `Extensió no pemitida "${extension}"`, { extension });
    }
    next();
}

module.exports = { validaExtension };