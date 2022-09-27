
const Category = require("../model/categoriasModel");
const { sendOk, badRequest, internalError } = require('../helpers/http');

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        return (!category)
            ? badRequest(res, 'no se encontro ninguna categoria con la siguiente id', id)
            : sendOk(res, 'Categoría encontrada', category)

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};



const getAllCategorys = async (req, res) => {
    try {

        const allCategorys = await Category.find();

        return sendOk(res, 'Categorías encontradas', allCategorys);

    } catch (error) {

        return internalError(res, 'Error inesperado', error);

    }
};

const createCategory = async (req, res) => {
    try {

        const { nombreCategoria } = req.body;


        if (await searchCategory(nombreCategoria)) {
            return badRequest(res, 'La categoría, ya se encuentra registrada', nombreCategoria);
        }

        const newCategory = await new Category({ nombreCategoria }).save();

        if (!newCategory) {
            return badRequest(res, 'La categoría no se pudo agregar correctamente', newCategory);
        }


        return sendOk(res, 'Categoría agregada correctamentes', newCategory);


    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const { nombreCategoria } = req.body;

        if (nombreCategoria.length <= 0) {
            return badRequest(res, 'El campo nombre categoria debe tener datos', nombreCategoria);
        }

        if (await searchCategory(nombreCategoria)) {
            return badRequest(res, 'No se pudo actualizar la categoría, ya que el nombre existe en la BD', nombreCategoria);
        }

        const canUpdateCategory = await Category.findByIdAndUpdate(id, req.body);

        if (!canUpdateCategory) {
            return badRequest(res, 'No se pudo actualizar la categoría', nombreCategoria);
        }

        return sendOk(res, 'Categoría Actualizada Correctamente', req.body);

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const canDeleteCategory = await Category.findByIdAndDelete(id);

        return (!canDeleteCategory)
            ? badRequest(res, 'No se pudo eliminar la categoría', {})
            : sendOk(res, 'Categoria Eliminada Correctamente', id);

    } catch (error) {
        return internalError(res, 'Error inesperado', error);
    }
};


const searchCategory = async (nombreCategoria) => {
    try {
        const existCategory = await Category.findOne({ nombreCategoria });

        return (existCategory) ? true : false;

    } catch (error) {

        return true;
    }

}

module.exports = {
    getCategoryById,
    getAllCategorys,
    createCategory,
    updateCategory,
    deleteCategory
}
