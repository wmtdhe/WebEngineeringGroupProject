const { User } = require('../db/model');

async function findUser(email, password){
    let whereOption = {};
    try{
        if(email)whereOption.email = email;
        if(password)whereOption.password = password;

            let user = await User.findOne({
                where:whereOption,
                attributes:['id','username','email']
            });
            return user?user.dataValues:null
    }catch (e) {
        return null
    }
}

async function createUser(username, password,email){
    try{
        let result = await User.create({
            username,
            password,
            email
        });
        return result
    }catch (e) {
        console.error(e.message)
        return null
    }
}

module.exports = {
    findUser,
    createUser
};