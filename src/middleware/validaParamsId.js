const ObjectId = require('mongoose').Types.ObjectId;



const validIdMongo = (req,res,next) =>{

    const{id} = req.params;

    if(!ObjectId.isValid(id)){
        return res.status(400).json({  
            "status":false,
            "message":"El parametro es incorrecto",
            "Data": id
        });
    }
    next();

}

module.exports={
validIdMongo
}
