const Koa = require("koa");


const app = new Koa();

app.use(function (ctx,next) {
   ctx.body = "Hello :D"
});

app.listen(3000,function () {
    console.log("gggg")
});

