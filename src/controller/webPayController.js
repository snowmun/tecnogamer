const { internalError, sendOk, badRequest } = require("../helpers/http");
const { confirmTransaction } = require("../service/webpay");

const verifyPay = async (req, res) => {
    try {
        const { token } = req.body;

        const respConfirm = await confirmTransaction(token);

        return sendOk(res, 'OK', respConfirm, 200);
    } catch (error) {
        console.log(error)
        return internalError(res, 'Error inesperado', error);
    }
}

module.exports = {
    verifyPay
}