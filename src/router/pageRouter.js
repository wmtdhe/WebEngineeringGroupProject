const Router = require("@koa/router");
const router = new Router();

router.get('/',async (ctx, next)=>{
   ctx.body = "index page"
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