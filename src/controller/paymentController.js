const { internalError, sendOk } = require("../helpers/http");
const { registerPurchase } = require("./purchaseController");
const { registerPurchaseDetail } = require("./purchaseDetailController");
const Pay = require("../model/pagosModel");
const Product = require("../model/productoModel");

const getPayById = async (req, res) => {

    try {

        const { id } = req.params;
        const pago = await Pay.findById(id);
        console.log(pago)
        if (!pago) {

            return badRequest(res, 'no se encontro ningun pago con la siguiente id', id);

        }

        const { valorCompra, fechaCompra, usuarioId, detalleCompraId } = pago.compraId[0];


        const { datosPersoId } = usuarioId[0];

        const { nombre, apellido, fono, correo } = datosPersoId[0];

        const respProduct = detalleCompraId.map(d => {

            const { nombreProducto, precio } = d.productoId[0];

            return {
                valor: d.valor,
                cantidad: d.cantidad,
                nombreProducto,
                precio,
                id: d._id
            }
        });

        sendOk(res, 'pago encontrada con exito', {
            pay: { valorCompra, fechaCompra },
            user: { nombre, apellido, fono, correo },
            products: respProduct
        })

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const allPayment = async (req, res) => {

    try {

        const allPagos = await Pay.find();

        return sendOk(res, 'las siguientes producto fueron encontradas', allPagos);

    } catch (error) {

        return internalError(res, 'Error inesperado', error);

    }
};

const registerPayment = async (req, res) => {
    try {

        const { products, valorCompra, fechaCompra, usuarioId } = req.body;

        const respDetail = await registerPurchaseDetail(products);

        const bodyPurchase = {
            valorCompra,
            fechaCompra,
            usuarioId,
            detalleCompraId: respDetail
        }
        const { _id } = await registerPurchase(bodyPurchase);

        const bodyPay = {
            tipoPago: req.body.tipoPago,
            estadoPago: req.body.estadoPago,
            fechaPago: req.body.fechaPago,
            compraId: _id
        }

        const registerPay = await new Pay(bodyPay).save();

        return sendOk(res, 'Compra realizada con éxito', registerPay, 200);

    } catch (error) {

        return internalError(res, error.message || 'Error inesperado', error);
    }
};

const updatePayment = async (req, res) => {
    try {

        const { id } = req.params;
        const { tipoPago } = req.body;

        if (nombreCategoria.length <= 0) {
            return badRequest(res, 'El campo tipo de pago debe tener datos', tipoPago);
        }

        if (await searchPago(tipoPago)) {
            return badRequest(res, 'No se pudo actualizar el pago ', tipoPago);
        }

        const canUpdatePay = await Product.findByIdAndUpdate(id, req.body);

        if (!canUpdatePay) {
            return badRequest(res, 'No se pudo actualizar el pago ', tipoPago);
        }
        return sendOk(res, 'pago Actualizado Correctamente', req.body);

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const deletePayment = async (req, res) => {
    try {

        const { id } = req.params;
        const cantDeletePagos = await Pay.deleteOne({ id });;

        return (!cantDeletePagos)
            ? badRequest(res, 'No se pudo eliminar el pago', { id })
            : sendOk(res, 'pago Eliminada Correctamente', id);

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const searchProduct = async (nombreProducto) => {
    try {

        const exitPago = await Product.findOne({ nombreProducto });

        return (exitPago) ? true : false;

    } catch (error) {
        return true;
    }
}

const searchPago = async (nombreProducto) => {
    try {

        const exitProduct = await pago.findOne({ nombreProducto });

        return (exitProduct) ? true : false;

    } catch (error) {
        return true;
    }

}

module.exports = {
    getPayById,
    allPayment,
    registerPayment,
    updatePayment,
    deletePayment
}