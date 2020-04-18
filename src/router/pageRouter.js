const Router = require("@koa/router");
const {
    getUser,
    retrieveUserPosts,
    retrievePost,
    deletePost,
    retrieveComments,
    retrievePostPictures
} = require("../controller/api");

const router = new Router();


router.get('/',async (ctx, next)=>{
    let {user} = ctx.session;
    // console.log(user)
    await ctx.render('index',{user,current:0})
});

router.get('/explore',async (ctx, next)=>{
    let {user} = ctx.session;
    let {tag, query} = ctx.query;
    let posts = [{id:1,title:'wandering',tag:'share'},{id:2,title:'lol',tag:'q&a'}];
    let tags = [{name:'js'},{name:'miao'},{name:'experience'},{name:'whywhy'},{name:'again'}];

    console.log(tag, query);
   await ctx.render('search',{current:1, posts, tags, user})
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
        let posts_res = await retrieveUserPosts(user.id);
        let posts = posts_res.data;
        await ctx.render('myspace',{current:5,user,posts})
    }
});

router.get('/posts', async(ctx, next)=>{
    let { user } = ctx.session;
    if(!user){
        ctx.redirect('/signin')
    } else {
        let { id } = ctx.query;
        let post_res = await retrievePost(id);
        let post = post_res.data;

        let comments_res = await retrieveComments(id);
        let comments = comments_res.data;

        let pictures_res = await retrievePostPictures(id);
        let pictures = pictures_res.data;
        await ctx.render('postdetail',{current:6,user,post,comments,pictures})
    }
});

module.exports = router;
