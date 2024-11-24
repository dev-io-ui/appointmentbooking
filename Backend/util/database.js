const Sequelize = require('sequelize');

const sequelize = new Sequelize('AppointmentBooking','root','root',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;