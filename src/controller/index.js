let { queryUser } = require("../service");
let {SuccessResponse, FailureResponse} = require("./responseModel");

async function getUser(){
    try{
        let result = await queryUser();
        if(result){
            return new SuccessResponse(result)
        }else{
            return new SuccessResponse([])
        }
    }catch (e) {
        return new FailureResponse(1000, "querying database failed")
    }
}

module.exports = {
    getUser
};