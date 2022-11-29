const { model } = require("mongoose");
const { default: fetch } = require("node-fetch");


const createTransaction = async (user, total) => {
    try {

        const resp = await fetch('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions', {
            body: JSON.stringify({
                "buy_order": Date.now(),
                "session_id": user,
                "amount": total,
                "return_url": "http://localhost:3000/detailPay"
            }),
            method: 'POST',
            headers: {
                'Tbk-Api-Key-Id': '597055555532',
                'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
                'Content-Type': 'application/json'
            }
        });

        return await resp.json();
    } catch (error) {
        throw error;
    }
}

const confirmTransaction = async (token) => {
    try {
        const resp = await fetch(`https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
            method: 'PUT',
            headers: {
                'Tbk-Api-Key-Id': '597055555532',
                'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
                'Content-Type': 'application/json'
            }
        });
        console.log(resp)
        return resp.json();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTransaction,
    confirmTransaction
}