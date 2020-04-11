const Router = require("@koa/router");
const {getUser} = require("../controller");

const router = new Router();


router.get('/',async (ctx, next)=>{
    let users = await getUser();
    if(users.errno === 0){
        // console.log(users.data);
        await ctx.render('index',{users:users.data})
    }else{
        ctx.body = users.msg
    }

});

router.get('/search',async (ctx, next)=>{
   ctx.body = "search page"
});

router.get('/sign_up',async (ctx, next)=>{
    ctx.body = "sign up"
});

router.get('/register',async (ctx,next)=>{
   ctx.body = "register"
});

module.exports = router;