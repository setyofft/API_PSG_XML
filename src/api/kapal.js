const xml = require('xml')
const {PsgMomsg} =  require('../database/models/Kapal')

module.exports = (app) => {

  app.get("/kapal", async (req, res, next) => {
    try {
        const welcom =  {pesan: "selamat datang, ini gateway api xml"} 
        return res.send(welcom);
    } catch (err) {
        next(err);
    }
  });

  app.put("/kapal/post", async (req, res, next) => {
    try {
      if (req.headers['accept'] == 'application/xml' && req.headers['content-type'] == 'application/xml') {
        const dataBody = req.body;
        if (!dataBody) {
          const params = {
              moid: dataBody.psg_momsg_send['moid'][0],
              referencemo: dataBody.psg_momsg_send['referencemo'][0],
              deviceid: dataBody.psg_momsg_send['deviceid'][0],
              serviceid: dataBody.psg_momsg_send['serviceid'][0],
              devicetype: dataBody.psg_momsg_send['devicetype'][0],
              network: dataBody.psg_momsg_send['network'][0],
              carrierflag: dataBody.psg_momsg_send['carrierflag'][0],
              msgtimestamp: dataBody.psg_momsg_send['msgtimestamp'][0],
              encoding: dataBody.psg_momsg_send['message'][0]['$']['encoding'],
              rawdata: dataBody.psg_momsg_send['message'][0]['rawdata'][0],
              timestamp: dataBody.psg_momsg_send['$']['timestamp']
          }
          await PsgMomsg.create(params);

          return res.send({message: "Success", status: true, request: dataBody});
        }else{
          return res.send({message: "Params Kosong", status: false, request: dataBody});
        }
        
      }else{
        return res.send({message: "Maaf tipe content tidak diizinkan !", status: false})
      }
    } catch (err) {
        return res.send(err)
    }
  });
};
