const Usuario = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Direccion = require("../model/direccionModel");
const DatosP = require("../model/datosPersonalesModel");
const { sendOk, badRequest, internalError } = require("../helpers/http");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length === 24) {
      Usuario.findById(id).then((usuario) => {
        if (!usuario) {
          return res.status(409).json({
            status: true,
            message: "no se encontro ningun usuario con la siguiente id",
            Data: id,
          });
        } else {
          const { _id, contrasena, __v, ...resto } = usuario._doc;
          return res.status(200).json({
            status: true,
            message: "usuario encontrado",
            Data: resto,
          });
        }
      });
    } else {
      return res.status(409).json({
        status: true,
        message: "El id del usuario es incorrecto",
        Data: id,
      });
    }
  } catch (error) {
    return res.status(409).json({
      status: true,
      message: "El id del usuario es incorrecto",
      Data: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allUser = await Usuario.find();
    return res.status(200).json({
      status: true,
      message: "Usuarios encontrados",
      Data: allUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const useregister = async (req, res) => {
  try {
    //const { calle, numero, block, depto, piso, comunaId } = req.body; //Desestructuración de modelo dirección

    const { nombre, rut, correo, apellido, fono,tipoUsuario } = req.body; //Desestructuración de modelo datos personales

    const { contrasena } = req.body; //Desestructuración de modelo usuario

    const existRut = await DatosP.find({ rut });

    if (existRut.length > 0) {
      return badRequest(res, "El rut ya esta registrado", rut);
    }
    const rol = tipoUsuario? tipoUsuario : 1 ;

    let nombreUser = `${nombre.substr(nombre, 2)}${apellido}`.toLowerCase(),
      usuario = "",
      contador = 1;

    do {
      usuario = await Usuario.find({ nombreUsuario: nombreUser });

      if (usuario.length > 0) nombreUser += contador++;

    } while (usuario === "");

    const contrasenaHasheada = bcrypt.hashSync(contrasena, 10);

    //const nuevoDireccion = await new Direccion({ calle, numero, block, depto, piso, comunaId }).save();
    const nuevoDatosP = await new DatosP({ nombre, rut, correo, apellido, fono, }).save();
    const nuevoUsuario = await new Usuario({ nombreUsuario: nombreUser, contrasena: contrasenaHasheada, rol , datosPersoId: nuevoDatosP._id, }).save();

    if (!nuevoUsuario) {
      return badRequest(res, "El usuairo no fue agregado", nuevoUsuario);
    }

    return sendOk(res, "Usuario agregado correctamente", nuevoUsuario);

  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }
};

const userlogin = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body;

    const existUser = await Usuario.find({ nombreUsuario });

    if (existUser.length === 0) {
      return badRequest(res, "No existe este usuario", nombreUsuario);
    }

    const { contrasena: bdPas, rol, nombreUsuario: nombreUser, datosPersoId } = existUser[0];

    const match = await bcrypt.compare(contrasena, bdPas);

    if (!match) {
      return badRequest(res, "Contraseña incorrecta", contrasena);
    }

    const { _id, nombre, apellido, correo } = datosPersoId.pop();

    return sendOk(res, "Usuario logeado correctamente", { rol, nombreUser, _id, nombre, apellido, correo });

  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }


  // Usuario.find(nombreUsuario).then((usuario) => {
  //   if (!usuario) {
  //     return res.status(409).json({
  //       status: true,
  //       message: " El usuario no fue encontraro ",
  //       id_Data: nombreUsuario,
  //     });
  //   }
  //   bcrypt.compare(contrasena, usuario.contrasena).then((esCorrecta) => {
  //     if (esCorrecta) {
  //       const token = jwt.sign(
  //         { id: usuario.id, correo: usuario.correo },
  //         "moveraenv",
  //         {
  //           expiresIn: "20m" /* 20 minutos */,
  //         }
  //       );
  //       return res.status(200).json({
  //         status: true,
  //         message: " Usuario Logeado correctamente ",
  //         usuario: token,
  //       });
  //     } else {
  //       return res.status(409).json({
  //         status: true,
  //         message: "  contraseña incorrecta ",
  //       });
  //     }
  //   });
  // });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const  {datosPersoId}  = await Usuario.findById({ _id: id });

    // con comuna 
    // const [{ _id: idPerso, direccionId }] = datosPersoId;
    // const [{ _id: idDire }] = direccionId;
    console.log(datosPersoId)
    const [{ _id: idPerso }] = datosPersoId;
    const userDelete = await Usuario.deleteOne({ _id: id });
    const personalDelete = await DatosP.deleteOne({ _id: idPerso });
    // await Direccion.deleteOne({ _id: idDire });



    if (!userDelete && !personalDelete) {
     return sendOk(res, "No se pudo eliminar el usuario0", id);
    }

    sendOk(res, "Usuario Eliminado Correctamente", id);

  } catch (error) {
    return internalError(res, "Error inesperado", error);
  }
};

const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, rut, correo, apellido, fono } = req.body;
    const datosActualizado = await DatosP.findByIdAndUpdate(
      { _id: id },
      nombre,
      rut,
      correo,
      apellido,
      fono
    );
    return res.status(200).json({
      status: true,
      message: "Registro Actualizado Correctamente",
      id_Data: datosActualizado,
    });
  } catch (error) {
    return res.status(409).json({
      status: true,
      message: error,
    });
  }
};

module.exports = {
  getUser,
  useregister,
  userlogin,
  getAll,
  deleteUser,
  UpdateUser,
};
