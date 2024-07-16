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
    },
    long:{
        type: DataTypes.STRING
    },
    lat:{
        type: DataTypes.STRING
    },
    sog:{
        type: DataTypes.DOUBLE
    },
    cog:{
        type: DataTypes.DOUBLE
    },
    year:{
        type: DataTypes.INTEGER
    },
    month:{
        type: DataTypes.INTEGER
    },
    date:{
        type: DataTypes.INTEGER
    },
    hour:{
        type: DataTypes.INTEGER
    },
    minutes:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

const PsgMomsgUptoDate = db.define('psg_momsg_uptodate', {
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
    },
    long:{
        type: DataTypes.STRING
    },
    lat:{
        type: DataTypes.STRING
    },
    sog:{
        type: DataTypes.DOUBLE
    },
    cog:{
        type: DataTypes.DOUBLE
    },
    year:{
        type: DataTypes.INTEGER
    },
    month:{
        type: DataTypes.INTEGER
    },
    date:{
        type: DataTypes.INTEGER
    },
    hour:{
        type: DataTypes.INTEGER
    },
    minutes:{
        type: DataTypes.INTEGER
    },
    rpm_1:{
        type: DataTypes.DOUBLE
    },
    rpm_2:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
// PsgMomsgUptoDate.removeAttribute('createdAt');
// PsgMomsgUptoDate.removeAttribute('updatedAt');


const PsgMomsgRPM = db.define('psg_momsg', {
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
    },
    long:{
        type: DataTypes.STRING
    },
    lat:{
        type: DataTypes.STRING
    },
    sog:{
        type: DataTypes.DOUBLE
    },
    cog:{
        type: DataTypes.DOUBLE
    },
    year:{
        type: DataTypes.INTEGER
    },
    month:{
        type: DataTypes.INTEGER
    },
    date:{
        type: DataTypes.INTEGER
    },
    hour:{
        type: DataTypes.INTEGER
    },
    minutes:{
        type: DataTypes.INTEGER
    },
    rpm_1:{
        type: DataTypes.DOUBLE
    },
    rpm_2:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});

module.exports = {
    PsgMomsg,
    PsgMomsgRPM,
    PsgMomsgUptoDate
}