const express = require('express');
const { PORT } = require('./config');
const expressApp = require('./express-app');
const OS = require('os');
const cluster = require('cluster');

const StartServer = async() => {

    const app = express();
    const numCPU = OS.cpus().length;
    
    await expressApp(app);

    if (cluster.isMaster) {
        for (let i = 0; i < numCPU; i++) {
            cluster.fork()
        }
    } else {
        app.listen(PORT, async () => {
            console.log(`listening on port ${PORT} and worker ${process.pid}`);
        }).on('error', (err) => {
            console.log(err);
            process.exit();
        })
    }
    
}

StartServer();