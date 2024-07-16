const xml = require('xml')
const {PsgMomsg, PsgMomsgUptoDate, PsgMomsgRPM} =  require('../database/models/Kapal')

module.exports = (app) => {

  app.get("/kapal", async (req, res, next) => {
    try {
        const welcom =  {pesan: "selamat datang, ini gateway api xml"} 
        return res.send(welcom);
    } catch (err) {
        next(err);
    }
  });

  app.get("/kapal/data/log", async (req, res, next) => {
    try {
        const show = await PsgMomsg.findAll();
        return res.send({message: "Success", status: true, results: show});
    } catch (err) {
        next(err);
    }
  });

  app.get("/kapal/data/last_update", async (req, res, next) => {
    try {
        const show = await PsgMomsgUptoDate.findAll();
        return res.send({message: "Success", status: true, results: show});
    } catch (err) {
        next(err);
    }
  });

  //POST PULSARPORTAL

  app.post("/kapal/post", async (req, res, next) => {
    var msgxmlRes = null
    var idxmlRes = null
    var stsxmlRes = null
    try {
      let params= []
      const dataBody = req.body;
      // if (req.headers['accept'] == 'application/xml' && req.headers['content-type'] == 'application/xml') {
        
      // }else{
      //   idxmlRes = dataBody.psg_momsg_send['moid'][0]
      //   msgxmlRes = 'Maaf tipe content tidak diizinkan !';
      //   stsxmlRes = 'error'
      // }
      const rawdesk = deskRawData(dataBody.psg_momsg_send['message'][0]['rawdata'][0])
      params = {
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
          timestamp: dataBody.psg_momsg_send['$']['timestamp'],
          long: rawdesk.long, 
          lat: rawdesk.lat, 
          sog:rawdesk.sog,
          cog:rawdesk.cog,
          year:rawdesk.year,
          month:rawdesk.month,
          date:rawdesk.date,
          hour:rawdesk.hour,
          minutes:rawdesk.minutes
      }
      await PsgMomsg.create(params);

      idxmlRes = dataBody.psg_momsg_send['moid'][0]
      msgxmlRes = null
      stsxmlRes = 'success'
      
      res.set('Content-Type', 'application/xml')
      return res.send('<?xml version = "1.0" encoding = "UTF-8" ?><PSG_MOmsg_rply><MOID>'+idxmlRes
      +'</MOID><status>'+stsxmlRes+'</status><reason>'+msgxmlRes+'</reason></PSG_MOmsg_rply>')
    } catch (err) {
      res.set('Content-Type', 'application/xml')
      return res.send('<?xml version = "1.0" encoding = "UTF-8" ?><PSG_MOmsg_rply><MOID>'+idxmlRes
      +'</MOID><status>error</status><reason>'+err.message+'</reason></PSG_MOmsg_rply>')
    }
  });

  function deskRawData(raw){
    // let raw = "cc0529774845002e0000000c42dcc1"
    const longi = ((((parseInt(raw.substring(0, 6), 16))/0.46603375)-18000000)/100000).toFixed(7)
    const lati = ((((parseInt(raw.substring(6, 12), 16))/0.9320675)-9000000)/100000).toFixed(9)

    //another data raw descript
    const sog = hex2dec(raw.substring(12, 14).slice(-6));
    const cog = Math.trunc(hex2dec(raw.substring(14, 16).slice(-6)) * 360/255)
    //get last data from raw
    const lastdata = raw.slice(-6)
    const tahun = parseInt(hex2bin(raw.substring(12, 14)).substring(0,2)+hex2bin(raw.slice(-2)).substring(0,5), 2) + 2000
    const bulan = parseInt(hex2bin(raw.slice(-2)).slice(-3)+hex2bin(lastdata.substring(2, 4)).substring(0,1), 2)
    const tgl = parseInt(hex2bin(lastdata.substring(2, 4)).substring(1, 6), 2)
    const jam = Math.trunc((parseInt(hex2bin(lastdata.substring(2, 4)).slice(-2)+hex2bin(lastdata.substring(0, 2)),2) * 2) / 60)
    const menit = (parseInt(hex2bin(lastdata.substring(2, 4)).slice(-2)+hex2bin(lastdata.substring(0, 2)),2) * 2)-(jam * 60)

    const resu = {
      long: longi, 
      lat: lati, 
      sog:sog,
      cog:cog,
      year:tahun,
      month:bulan,
      date:tgl,
      hour:jam,
      minutes:menit
    }
    return resu;
  }

  //POST RAW RPM
  app.post("/kapal/v1/post", async (req, res, next) => {
    var msgxmlRes = null
    var idxmlRes = null
    var stsxmlRes = null
    try {
      let params= []
      const dataBody = req.body;
      const rawdesk = deskRawDataRPM(dataBody.psg_momsg_send['message'][0]['rawdata'][0])
      params = {
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
          timestamp: dataBody.psg_momsg_send['$']['timestamp'],
          long: rawdesk.long, 
          lat: rawdesk.lat, 
          sog:rawdesk.sog,
          cog:rawdesk.cog,
          year:rawdesk.year,
          month:rawdesk.month,
          date:rawdesk.date,
          hour:rawdesk.hour,
          minutes:rawdesk.minutes,
          rpm_1:rawdesk.rpm1,
          rpm_2:rawdesk.rpm2
      }
      await PsgMomsgRPM.create(params);

      idxmlRes = dataBody.psg_momsg_send['moid'][0]
      msgxmlRes = null
      stsxmlRes = 'success'
      
      res.set('Content-Type', 'application/xml')
      return res.send('<?xml version = "1.0" encoding = "UTF-8" ?><PSG_MOmsg_rply><MOID>'+idxmlRes
      +'</MOID><status>'+stsxmlRes+'</status><reason>'+msgxmlRes+'</reason></PSG_MOmsg_rply>')
    } catch (err) {
      res.set('Content-Type', 'application/xml')
      return res.send('<?xml version = "1.0" encoding = "UTF-8" ?><PSG_MOmsg_rply><MOID>'+idxmlRes
      +'</MOID><status>error</status><reason>'+err.message+'</reason></PSG_MOmsg_rply>')
    }
  });

  function deskRawDataRPM(raw){
    // let raw = "cc0529774845002e0000000c42dcc1"
    const longi = ((((parseInt(raw.substring(0, 6), 16))/0.46603375)-18000000)/100000).toFixed(7)
    const lati = ((((parseInt(raw.substring(6, 12), 16))/0.9320675)-9000000)/100000).toFixed(9)

    //another data raw descript
    const sog = hex2dec(raw.substring(12, 14).slice(-6));
    const cog = Math.trunc(hex2dec(raw.substring(14, 16).slice(-6)) * 360/255)
    //get last data from raw
    const lastdata = raw.slice(-6)
    const tahun = parseInt(hex2bin(raw.substring(12, 14)).substring(0,2)+hex2bin(raw.slice(-2)).substring(0,5), 2) + 2000
    const bulan = parseInt(hex2bin(raw.slice(-2)).slice(-3)+hex2bin(lastdata.substring(2, 4)).substring(0,1), 2)
    const tgl = parseInt(hex2bin(lastdata.substring(2, 4)).substring(1, 6), 2)
    const jam = Math.trunc((parseInt(hex2bin(lastdata.substring(2, 4)).slice(-2)+hex2bin(lastdata.substring(0, 2)),2) * 2) / 60)
    const menit = (parseInt(hex2bin(lastdata.substring(2, 4)).slice(-2)+hex2bin(lastdata.substring(0, 2)),2) * 2)-(jam * 60)
    //convert UTC
    // const tglutc = new Date(tahun+"-"+bulan+"-"+(tgl+1)+" "+jam+":"+menit).toUTCString()
    //RPM 1
    const rpm1binhexp1 = bin2hex(hex2bin(raw.substring(20, 22).slice(-6)).slice(-3))
    const rpm1p1 = rpm1binhexp1 == 0 ? "" : rpm1binhexp1
    const rpm1binhexp2 = bin2hex(hex2bin(raw.substring(16, 18).slice(-6)).slice(-3))
    const rpm1p2 = rpm1binhexp2 == 0 ? "" : rpm1binhexp2
    //RPM 2
    const rpm2binhexp1 = bin2hex(hex2bin(raw.substring(20, 22).slice(-6)).slice(-3))
    const rpm2p1 = rpm2binhexp1 == 0 ? "" : rpm2binhexp1
    const rpm2binhexp2 = bin2hex(hex2bin(raw.substring(18, 20).slice(-6)).slice(-3))
    const rpm2p2 = rpm2binhexp2 == 0 ? "" : rpm2binhexp2
    //skala decimal (excel) rpm1
    const sdrmp1 = hex2bin(raw.substring(20, 22).slice(-6)).substring(0,2)
    const sdrpm1if = parseInt(sdrmp1.substring(1,2)) == 1 ? 100 : 1
    const rpm1 = sdrpm1if * (rpm1p1+""+rpm1p2 == "" ? 0 : parseFloat(rpm1p1+""+rpm1p2))
    //skala decimal (excel) rpm2
    const sdrmp2 = hex2bin(raw.substring(20, 22).slice(-6)).substring(0,1)
    const sdrpm2if = parseInt(sdrmp2) == 1 ? 100 : 1
    const rpm2 = sdrpm2if * (rpm2p1+""+rpm2p2 == "" ? 0 : parseFloat(rpm2p1+""+rpm2p2))

    const resu = {
      row: raw,
      long: longi, 
      lat: lati, 
      sog:sog,
      cog:cog ,
      year:tahun,
      month:bulan,
      date:tgl,
      hour:jam,
      minutes:menit,
      rmp1: rpm1,
      rpm2:rpm2
    }
    return resu;
  }

  function hex2bin(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
  }
  function hex2dec(hex){
    return parseInt(hex, 16);
  }
  function bin2hex(bin){
    return parseInt(bin, 2).toString(16).toUpperCase();
  }
  function bin2dec(bin){
    return parseInt(bin, 2);
  }

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes ;
  }
  
};
