const purchaseDetail = require("../model/detalleCompraModel");
const product = require("../model/productoModel");

const onePurchaseDetail = async (req, res) => {
    try {

    } catch (error) {

    }
};

const allPurchaseDetail = async (req, res) => {
    try {

    } catch (error) {

    }
};

const registerPurchaseDetail = async (detail = []) => {
    try {

        const arrayId = [];

        for (const productDetail of detail) {

            const findProduct = await product.findById(productDetail.productoId);

            const newStock = parseInt(findProduct.stock) - productDetail.cantidad;

            if (newStock < 0) throw { error: true, message: `Lo sentimos, pero no hay stock suficiente del producto ${findProduct.nombreProducto}`, code: 400 }

            delete findProduct.stock;

            findProduct.stock = newStock

            await product.findByIdAndUpdate(productDetail.productoId, findProduct);

            const { _id } = await new purchaseDetail(productDetail).save();

            arrayId.push(_id);
        }

        return arrayId;

    } catch (error) {
        throw error;
    }
};

const updatePurchaseDetail = async (req, res) => {
    try {

    } catch (error) {

    }
};

const deletePurchaseDetail = async (req, res) => {
    try {

    } catch (error) {

    }
};

module.exports = {
    onePurchaseDetail,
    allPurchaseDetail,
    registerPurchaseDetail,
    updatePurchaseDetail,
    deletePurchaseDetail
}