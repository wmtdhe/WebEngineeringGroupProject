const Sequelize = require("sequelize");

const config = {
    host:"localhost",
    dialect:"mysql"
};

let seq = new Sequelize("travel_idea","root","qw159951",config);

module.exports = seq;