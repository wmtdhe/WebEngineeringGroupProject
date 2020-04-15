let { User } = require("../db/model");

async function queryUser() {
    let results = await User.findAndCountAll();
    // console.log(results)
    if(results){
        let ret = results.rows.map(v=>{
           return v.dataValues
        });
        return ret;
    }else{
        return null
    }
}


module.exports = {
  queryUser
};

