const Router = require("@koa/router");
const {getUser} = require("../controller/api");

const router = new Router();


router.get('/',async (ctx, next)=>{
    let {user} = ctx.session;
    // console.log(user)
    await ctx.render('index',{user,current:0})
});

router.get('/explore',async (ctx, next)=>{
    let posts = [{id:1,title:'wandering',tag:'share'},{id:2,title:'lol',tag:'q&a'}];
    let tags = [{name:'js'},{name:'miao'},{name:'experience'},{name:'whywhy'},{name:'again'}];
   await ctx.render('search',{current:1, posts, tags})
});

router.get('/signin',async (ctx, next)=>{
    let {user} = ctx.session;
    await ctx.render('login',{current:4,user})
});

router.get('/register',async (ctx,next)=>{
    let {user} = ctx.session;
   await ctx.render('register',{current:3,user})
});

router.get('/logout',async (ctx, next)=>{
    delete ctx.session.user;
    ctx.redirect('/');
});

router.get('/about',async (ctx,next)=>{
    let {user} = ctx.session;
    await ctx.render('about',{current:2,user})
});

router.get('/myspace',async (ctx,next)=>{
    let { user } = ctx.session;
    if(!user){
        ctx.redirect('/signin')
    }else{
        ctx.body = 'my space'
    }
});

router.get

module.exports = router;
