const { 
    findUser, 
    createUser, 
    getUserPosts,
    getPost,
    delPost,
    poComment,
    getComments,
    getPictures
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

async function retrieveUserPosts(userid) {
    let posts = await getUserPosts(userid);
    if (posts) {
        return new SuccessResponse(posts);
    } else {
        return new FailureResponse(403, 'No matched posts found')
    }
}

async function retrievePost(postId){
    let post = await getPost(postId);
    if (post) {
        return new SuccessResponse(post);
    } else {
        return new FailureResponse(403, 'No matched posts found')
    }
}

async function deletePost(postId){
    let result = await delPost(postId);
    if (result) {
        return new SuccessResponse();
    } else {
        return new FailureResponse(1002, 'failed delete post');
    }
}

async function postComment(postId, userId, content) {
    let result = await poComment(postId, userId, content);
    if (result) {
        return new SuccessResponse();
    } else {
        return new FailureResponse(1003, 'failed post comment');
    }
}

async function retrieveComments(postId) {
    let comments = await getComments(postId);
    if (comments) {
        return new SuccessResponse(comments);
    } else {
        return new FailureResponse(1004, 'failed retrieve comments');
    }
}

async function retrievePostPictures(postId){
    let pictures = await getPictures(postId);
    if (pictures){
        return new SuccessResponse(pictures);
    } else {
        return new FailureResponse(1005, 'failed retrieve post pictures');
    }
}


module.exports = {
    getUser,
    registerUser,
    retrieveUserPosts,
    retrievePost,
    deletePost,
    postComment,
    retrieveComments,
    retrievePostPictures
};