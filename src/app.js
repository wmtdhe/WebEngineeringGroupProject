const Koa = require("koa");
const static = require("koa-static");
const views = require("koa-views");
const koaBody = require("koa-body");
const session = require("koa-generic-session");
const pageRouter = require("./router/pageRouter");
const apiRouter = require("./router/api");

const app = new Koa();

app.use(static("./public")); // load static file
app.use(koaBody({multipart: true})); // body parsing

//session
app.keys = ['whatever'];
app.use(session({
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        overwrite: true,
        signed: true
    }
}));

//template
app.use(views(__dirname+'/views', {
    extension:'ejs', // default extension for rendering views
    map:{ejs:'ejs'} // map file to certain template
}));


app
    .use(pageRouter.routes()).use(pageRouter.allowedMethods())
    .use(apiRouter.routes()).use(apiRouter.allowedMethods())
    .use(async(ctx)=>{
        ctx.body = "404"
    });


app.listen(3000,function () {
    console.log(200)
});

