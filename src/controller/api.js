const { findUser, createUser } = require('../service/api');
const { SuccessResponse, FailureResponse } = require('./responseModel');


async function getUser(username, password){ //
    let user = await findUser(username, password);
    if(user){
        return new SuccessResponse(user)
    }else{
        return new FailureResponse(403,'No matched user found')
    }
}

async function registerUser(username,password){
    let result = await createUser(username, password);
    if(result){
        let ret = result.dataValues;
        // console.log(ret);
        return new SuccessResponse()
    }else{
        return new FailureResponse(1001,'failed registration')
    }
}


module.exports = {
    getUser,
    registerUser
};