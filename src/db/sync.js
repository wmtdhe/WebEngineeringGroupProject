const seq = require("./seq");

require("./model");

// check connection
seq.authenticate()
    .then(res=>console.log('ok'))
    .catch(e=>console.log(e));


seq.sync({force:true}).then(res=>{
    console.log(200);
    process.exit();
}).catch(err=>{
    console.log(err.message);
});