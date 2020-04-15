const { User } = require('../db/model');

async function findUser(username, password){
    let whereOption = {};
    try{
        if(username)whereOption.username = username;
        if(password)whereOption.password = password;

            let user = await User.findOne({
                where:whereOption,
                attributes:['id','username']
            })
            return user?user.dataValues:null
    }catch (e) {
        return null
    }
}

async function createUser(username, password){
    try{
        let result = await User.create({
            username,
            password
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