const db = require('../connMysql');
const {DataTypes} = require('sequelize');

const PsgMomsg = db.define('psg_momsg', {
    moid:{
        type: DataTypes.STRING
    },
    referencemo:{
        type: DataTypes.STRING
    },
    deviceid:{
        type: DataTypes.STRING
    },
    serviceid:{
        type: DataTypes.STRING
    },
    devicetype:{
        type: DataTypes.STRING
    },
    network:{
        type: DataTypes.STRING
    },
    carrierflag:{
        type: DataTypes.STRING
    },
    msgtimestamp:{
        type: DataTypes.STRING
    },
    encoding:{
        type: DataTypes.STRING
    },
    rawdata:{
        type: DataTypes.TEXT
    },
    timestamp:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

module.exports = {
    PsgMomsg
}