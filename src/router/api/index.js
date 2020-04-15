const Router = require('@koa/router');
const {getUser, registerUser} = require('../../controller/api');
const {SuccessResponse, FailureResponse} = require("../../controller/responseModel");



const router = new Router();

router.prefix('/api');

router.post('/login',async (ctx, next)=>{
    let {username, password } = ctx.request.body;
    let user = await getUser(username, password);
    if(user.errno===0){
        //console.log(user);  //{errono, }
        ctx.session.user = user.data;
    }
    ctx.body = user
});

router.post('/register',async (ctx,next)=>{
   let {username, password, repass} = ctx.request.body;
    // check if username is duplicate
    let user = await getUser(username);
    if(user.errno===0){
        ctx.body = new FailureResponse(1000,'Username already existed')
    }else{
        let result = await registerUser(username, password);
        ctx.body =  result //
    }
});



module.exports = router;