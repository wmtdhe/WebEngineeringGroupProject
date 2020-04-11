let { User } = require("./model");

(async function(){
    let u1 =await User.create({
       username:'u1',
       password:'123456',
    });
    let u2 =await User.create({
        username:'u2',
        password:'123456',
    });
    let u3 =await User.create({
        username:'u3',
        password:'123456',
    });
    console.log(u1.dataValues, u2.dataValues, u3.dataValues)
    process.exit();
}());