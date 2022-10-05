const fs = require("fs");
const path = require("path");
const Product = require("../model/productoModel");
const { sendOk, badRequest, internalError } = require("../helpers/http");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    const img64 = Buffer.from(product.img).toString('base64');

    if (!product) {
      return badRequest(res, "no se encontro ningún producto con la siguiente id", id)
    }

    const body = {
      _id: product._id,
      nombreProducto: product.nombreProducto,
      stock: product.stock,
      precio: product.precio,
      descripcion: product.descripcion,
      extension: product.extension,
      categoriaId: product.categoriaId,
      marcaId: product.marcaId
    }

    sendOk(res, "Producto encontrada con exito", { body, img64 });

  } catch (error) {
    console.log(error)
    return internalError(res, "Error inesperado", error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProduct = await Product.find();

    const newData = allProduct.map(product => {

      const img64 = Buffer.from(product.img).toString('base64');

      const body = {
        _id: product._id,
        nombreProducto: product.nombreProducto,
        stock: product.stock,
        precio: product.precio,
        descripcion: product.descripcion,
        extension: product.extension,
        categoriaId: product.categoriaId,
        marcaId: product.marcaId,
        img64
      }

      return body;

    });

    return sendOk(res, "Productos encontrados", newData);
  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombreProducto, img } = req.body;
    // const countProduct = await searchProduct(nombreProducto.trim());

    // if( countProduct > 0 || countProduct === -1){
    //     return badRequest(res, 'Ya se encuentra registrado este producto', nombreProducto);
    // }

    const bindata = (img.length > 0) ? Buffer.from(img, "base64") : '';

    req.body.img = bindata;

    const newProduct = await new Product(req.body).save();

    if (!newProduct) {
      return badRequest(res, "No se pudo agregar correctamente", newProduct);
    }

    return sendOk(res, "Producto agregado correctamente", newProduct);
  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombreProducto, img } = req.body;

    const bindata = (img.length > 0) ? Buffer.from(img, "base64") : img;

    req.body.img = bindata;

    const canUpdateProduct = await Product.findByIdAndUpdate(id, req.body);

    if (!canUpdateProduct) {
      return badRequest(res, "No se pudo actualizar el producto", nombreProducto);
    }

    return sendOk(res, "Producto Actualizado Correctamente", req.body);

  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const canDeleteProduct = await Product.findByIdAndDelete(id);

    if (!canDeleteProduct) {
      badRequest(res, "No se pudo eliminar el producto", {});
    }

    sendOk(res, "Producto Eliminado Correctamente", id);
  } catch (error) {

    return internalError(res, "Error inesperado", error);
  }
};

const searchProduct = async (nombreProducto) => {
  try {
    return (await Product.find({ nombreProducto })).length;
  } catch (error) {
    return -1;
  }
};


const getProductsByCategory = async (req, res) => {
  try {

    const { id } = req.params;

    const allProductsByCategory = await Product.where('categoriaId').in(id);

    const newData = allProductsByCategory.map(product => {

      const img64 = Buffer.from(product.img).toString('base64');

      const body = {
        _id: product._id,
        nombreProducto: product.nombreProducto,
        stock: product.stock,
        precio: product.precio,
        descripcion: product.descripcion,
        extension: product.extension,
        categoriaId: product.categoriaId,
        marcaId: product.marcaId,
        img64
      }

      return body;

    });

    sendOk(res, "Productos encontrados", newData);

  } catch (error) {

    console.log(error)
    return internalError(res, "Error inesperado", error);

  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
