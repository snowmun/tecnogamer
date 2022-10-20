const { sendOk, badRequest, internalError } = require("../helpers/http");
const Product = require("../model/productoModel");


const validaStock = async (req, res, next) => {
    try {

        const { products } = req.body;

        for (const { productoId } of products) {
            const { stock, nombreProducto } = await Product.findById(productoId);
            if (parseInt(stock) < 1) {
                return badRequest(res, `Ups, no hay stock del producto ${nombreProducto}`, {}, 400);
            }
        }
        next();
    } catch (error) {
        console.log(error)
        internalError(res, 'Error inesperado', {}, 500);
    }
}

module.exports = { validaStock }