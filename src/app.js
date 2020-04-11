const Koa = require("koa");
const static = require("koa-static");
const pageRouter = require("./router/pageRouter");

const app = new Koa();

app.use(static("./public"));

app
    .use(pageRouter.routes()).use(pageRouter.allowedMethods())
    .use(async(ctx)=>{
        ctx.body = "404"
    });


app.listen(3000,function () {
    console.log("gggg")
});

