const Router = require('@koa/router');
const {
    getUser, 
    registerUser,
    postComment,
    retrieveComments,
    retrievePost,
    new_idea,
    update_idea,
    deletePost
} = require('../../controller/api');
const {SuccessResponse, FailureResponse} = require("../../controller/responseModel");



const router = new Router();

router.prefix('/api');

router.post('/login',async (ctx, next)=>{
    let {email, password } = ctx.request.body;
    let user = await getUser(email, password);
    if(user.errno===0){
        // console.log(user);  //{errono, }
        ctx.session.user = user.data;
    }
    ctx.body = user
});

router.post('/register',async (ctx,next)=>{
   let {username, password, repass, email} = ctx.request.body;
    // check if username is duplicate
    let user = await getUser(username);
    if(user.errno===0){
        ctx.body = new FailureResponse(1000,'Username already existed')
    }else{
        let result = await registerUser(username, password, email);
        ctx.body =  result //
    }
});

router.post('/comment', async(ctx,next)=>{
    let { content, userId, postId } = ctx.request.body;
    let result = await postComment(postId, userId, content);
    ctx.body = result;
});

router.get('/posts-delete', async(ctx,next)=>{
    let { id } = ctx.query;
    let result = await deletePost(id);
    ctx.body = result;
});

router.post('/new_idea',async(ctx,next)=>{
    let {user_id, title, destination, start_date, end_date, content, tags} = ctx.request.body;
    let image = ctx.request.files.image;
    //console.error(user_id, title, destination, start_date, end_date, tags, image);
    let result = await new_idea(user_id, title, destination, start_date, end_date, content, tags, image);
    ctx.body = result;
});

router.post('/update_idea',async(ctx,next)=>{
    let {post_id, user_id, title, destination, start_date, end_date, content} = ctx.request.body;
    let image = ctx.request.files.image;
    let result = await update_idea(post_id, user_id, title, destination, start_date, end_date, content, image);
    ctx.body = result;
});

module.exports = router;