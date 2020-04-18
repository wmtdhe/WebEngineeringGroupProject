const { User, Post, Tag } = require('../db/model');

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

async function getTag(tagId) {
    let whereOption = {}
    try{
        if (tagId)whereOption.id = tagId;
        let tag = await Tag.findOne({
            where: whereOption,
            attributes:['name']
        });
        return tag ? tag.dataValues['name'] : '';
    } catch (e) {
        return null;
    }
}

async function getUserPost(userid) {
    let whereOption = {};
    posts_arr = []
    try {
        if (userid)whereOption.userId = userid;
        let posts = await Post.findAll({
            where: whereOption,
            attributes:['id', 'title', 'content', 'tagId', 'updatedAt']
        });

        if (!posts) return null;
        for (post of posts) {
            let tag = await getTag(post.dataValues['tagId']);
            let updatedAt = post.dataValues['updatedAt'].toISOString().split('T')[0];
            p = {
                'id': post.dataValues['id'],
                'title': post.dataValues['title'],
                'content': post.dataValues['content'],
                'tag': tag,
                'updatedAt': updatedAt,
            }
            posts_arr.push(p)
        }

        return posts_arr;

    }catch (e){
        return null;
    }
}

module.exports = {
    findUser,
    createUser,
    getUserPost
};