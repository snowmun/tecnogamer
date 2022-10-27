const Usuario = require("../model/userModel");
const bcrypt = require("bcrypt");
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

    const { nombre, rut, correo, apellido, fono, tipoUsuario } = req.body; //Desestructuración de modelo datos personales

    const { contrasena } = req.body; //Desestructuración de modelo usuario

    const existRut = await DatosP.find({ rut });

    if (existRut.length > 0) {
      return badRequest(res, "El rut ya esta registrado", rut);
    }
    const rol = tipoUsuario ? tipoUsuario : 1;

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

    const nuevoUsuario = await new Usuario({ nombreUsuario: nombreUser, contrasena: contrasenaHasheada, rol, datosPersoId: nuevoDatosP._id, }).save();

    if (!nuevoUsuario) {
      return badRequest(res, "El usuairo no fue agregado", { nuevoUsuario });
    }
    const { rol: rolUser, nombreUsuario, _id, datosPersoId } = nuevoUsuario;

    return sendOk(res, "Usuario agregado correctamente", {
      rolUser,
      nombreUser: nombreUsuario,
      _id,
      nombre: datosPersoId[0].nombre,
      apellido: datosPersoId[0].apellido,
      correo: datosPersoId[0].correo,
      fono: datosPersoId[0].fono
    });

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

    const { contrasena: bdPas, rol, nombreUsuario: nombreUser, datosPersoId, _id } = existUser[0];

    const match = await bcrypt.compare(contrasena, bdPas);

    if (!match) {
      return badRequest(res, "Contraseña incorrecta", contrasena);
    }

    const { nombre, apellido, correo, fono } = datosPersoId.pop();

    return sendOk(res, "Usuario logeado correctamente", { rol, nombreUser, _id, nombre, apellido, correo, fono });

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
    const { datosPersoId } = await Usuario.findById({ _id: id });

    // con comuna 
    // const [{ _id: idPerso, direccionId }] = datosPersoId;
    // const [{ _id: idDire }] = direccionId;
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

    const { nombreUsuario, nombreUser, rol, nombre, apellido, rut, fono, correo } = req.body;

    const existUser = await searchUser(nombreUsuario || nombreUser);

    if (existUser.length > 0 || existUser === -1) {
      if (existUser[0]._id.toString() !== id) {
        return badRequest(res, `Ya se encuentra registrado este nombre de usuario "${nombreUsuario || nombreUser}"`, nombreUsuario || nombreUser);
      }
    }

    await Usuario.findByIdAndUpdate(id, { nombreUsuario: nombreUsuario || nombreUser, rol });

    await DatosP.findByIdAndUpdate(existUser[0].datosPersoId[0]._id, {
      nombre,
      apellido,
      rut: (nombreUsuario) ? rut : existUser[0].datosPersoId[0].rut,
      fono,
      correo
    }
    );
    return sendOk(res, "Registro Actualizado Correctamente", req.body);

  } catch (error) {
    console.log(error)
    return internalError(res, "Error inesperado", error);
  }
};

const searchUser = async (nombreUsuario) => {
  try {

    const counteUser = await Usuario.find({ nombreUsuario });

    return counteUser;

  } catch (error) {
    return -1;
  }
};


const changePass = async (req, res) => {
  try {
    const { lastPass, newPass } = req.body;

    const { id } = req.params;

    const findUser = await Usuario.findById(id);

    const match = await bcrypt.compare(lastPass, findUser.contrasena);

    if (!match) {
      return badRequest(res, 'La contraseña actual, no coincide con la registrada', {});
    }

    await Usuario.findByIdAndUpdate(id, { contrasena: bcrypt.hashSync(newPass, 10) });

    return sendOk(res, "Contraseña actualizada correctamente", {});

  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getUser,
  useregister,
  userlogin,
  getAll,
  deleteUser,
  UpdateUser,
  changePass
};
