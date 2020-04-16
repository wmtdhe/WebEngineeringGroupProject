const seq = require("./seq");
const Sequelize = require("sequelize");

const User = seq.define("user",{
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    username:{
        type:Sequelize.STRING,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    avatar:{
        type:Sequelize.STRING,

    }
});

const Post = seq.define("post",{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    content:{
        type:Sequelize.TEXT
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    tagId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});


const Tag = seq.define("tag",{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
});

const Picture = seq.define("picture",{
    url:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    blogId:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
});

Post.belongsTo(User,{
    foreignKey:"userId"
});

Post.belongsTo(Tag,{
    foreignKey:"tagId"
});

module.exports = {
    User,
    Post,
    Tag,
    Picture
};