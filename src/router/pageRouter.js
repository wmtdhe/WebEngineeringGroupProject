const Router = require("@koa/router");
const {
    getUser,
    retrieveUserPosts,
    retrievePost,
    deletePost,
    retrieveComments,
    retrievePostPictures,
    retrievePostsByTagname,
    retrievePostsByDestination,
    getApi
} = require("../controller/api");

const router = new Router();


router.get('/',async (ctx, next)=>{
    let {user} = ctx.session;
    // console.log(user)
    await ctx.render('index',{user,current:0})
});

router.get('/explore',async (ctx, next)=>{
    let {user} = ctx.session;
    let {type, query} = ctx.query;
    var posts = [];
    var weather = {};
    if (type === 'tag') {
        let posts_res = await retrievePostsByTagname(query);
        posts = posts_res.data;
    } else if (type === 'destination') {
        let posts_res = await retrievePostsByDestination(query);
        posts = posts_res.data;

        let weatherApi = 'http://api.weatherapi.com/v1/current.json?key=8da9b490cc334d63b03151247201804&q=' + query;
        weather_res = await getApi(weatherApi);
        if (weather_res.errno!==999) {
            weather['name'] = weather_res['location']['name'];
            weather['localtime'] = weather_res['location']['localtime'];
            weather['temperature'] = weather_res['current']['temp_c'];
            weather['condition_text'] = weather_res['current']['condition']['text'];
            weather['condition_icon'] = weather_res['current']['condition']['icon'];
            weather['wind_mph'] = weather_res['current']['wind_mph'];
            weather['pressure_mb'] = weather_res['current']['pressure_mb'];
            weather['humidity'] = weather_res['current']['humidity'];
            weather['uv'] = weather_res['current']['uv'];
        }
    }
   await ctx.render('search',{current:1, posts, user, type, query, weather})
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
