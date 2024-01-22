const {Sequelize} = require('sequelize');

const db = new Sequelize(
    'PSGDB', 
    'panda', 
    '5e7Y0..==??',{
        host: '127.0.0.1',
        dialect: 'mysql',
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        timezone: "+07:00",
        logging: process.env.NODE_ENV === 'prod' ? false : console.log
    }
);

try {
    db.authenticate()
} catch (error) {
    console.error(error);
}

module.exports = db;
