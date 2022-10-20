const purchase = require("../model/compraModel");

const registerPurchase = async (order) => {
    try {

        const { _id } = await new purchase(order).save();

        return {
            _id
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { registerPurchase }