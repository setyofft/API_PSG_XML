const express = require('express');
const cors  = require('cors');
const { kapal } = require('./api');
const HandleErrors = require('./utils/error-handler');
const xmlparse =  require('express-xml-bodyparser');
const helmet = require('helmet')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(xmlparse());
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));

    const corsOptions = {
        origin:'*', 
        method: "GET, PUT",
        credentials:true
    }

    app.use(cors(corsOptions));
    app.use(helmet({
        crossOriginResourcePolicy: false,
    }));

    //api
    kapal(app); 

    // error handling
    app.use(HandleErrors);
    
}