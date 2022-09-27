const nodemailer = require("nodemailer");

const { sendOk, internalError } = require('../helpers/http');

const send = async (req, res) => {
    try {
        const { correo } = req.body;


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "smashdojo3@gmail.com",
                pass: 'jtscyazqarmiaddm',
            },
        });

        await transporter.sendMail({
            to: `${correo}`,
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });


        return sendOk(res, "Correo enviado", {});

    } catch (error) {
        internalError(res, 'Error inesperado', error);
    }

}

module.exports = { send }