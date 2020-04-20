let { User, Post } = require("./model");

(async function(){

    let p1 =await Post.create({
       title:'p3',
       content:'p3 content',
       userId:1,
       destination:'nanjing',
       startDate:new Date(),
       endDate:new Date()
    });
    console.log(p1.dataValues);
    process.exit();
}());