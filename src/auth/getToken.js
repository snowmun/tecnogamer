const http = require('../helpers/http');
const jwt = require('jsonwebtoken');

const createToken = (req,res) => {
  try {
        const postData = req.body;
        const accessApi = {key:postData.apiKey,origen:'dev'};
        if (accessApi) {

            const token = jwt.sign({ accessApi }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
            
            return http.sendOk(res, 'Acceso permitido',{ "token": token, "origen": accessApi.origen});
        } else {
         
            return http.badRequest(res, 'Acceso denegado',[], 403);
        }
    } catch (error) {
        return http.internalError(res, "Error interno", error);
    }
}

module.exports = {createToken};