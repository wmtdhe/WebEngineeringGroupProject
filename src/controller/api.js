const { 
    findUser, 
    createUser, 
    getUserPost 
} = require('../service/api');
const { SuccessResponse, FailureResponse } = require('./responseModel');


async function getUser(email, password){ //
    let user = await findUser(email, password);
    if(user){
        return new SuccessResponse(user)
    }else{
        return new FailureResponse(403,'No matched user found')
    }
}

async function registerUser(username,password,email){
    let result = await createUser(username, password, email);
    if(result){
        let ret = result.dataValues;
        // console.log(ret);
        return new SuccessResponse()
    }else{
        return new FailureResponse(1001,'failed registration')
    }
}

async function retrieveUserPost(userid) {
    let posts = await getUserPost(userid);
    if (posts) {
        return new SuccessResponse(posts);
    } else {
        return new FailureResponse(403, 'No matched posts found')
    }
}


module.exports = {
    getUser,
    registerUser,
    retrieveUserPost
};