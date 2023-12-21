const {Sequelize} = require('sequelize');

const db = new Sequelize(
    process.env.DBNAME, 
    process.env.DBUSER, 
    process.env.DBPASSWORD,{
        host: process.env.DBHOST,
        dialect: process.env.DBDIALECT,
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: "+07:00",
        logging: process.env.NODE_ENV === 'production' ? false : console.log
    }
);

try {
    db.authenticate()
} catch (error) {
    console.error(error);
}

module.exports = db;
