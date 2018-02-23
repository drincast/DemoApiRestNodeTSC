import * as http from 'http';
import * as mongoose from 'mongoose';
const configApp = require('../configApp.json');

//const serverDB = http.createServer();
//const port = process.env.POST || 3000;
const database = process.env.MONGO_URL || configApp.urlBDNube;

// mongoose.connect(database, onDBConnect);
// server.on('request', router);
// server.on('listening', onListening);
//
// function onDBConnect(err, res){
//     if(err) throw err;
//     else{
//         server.listen(port);
//     }
// }
//
// function onListening(){
//     console.log(`server open on http://localhost:${port}`);
// }

export class DataDB{
  constructor(){
    console.log('DAtaDB constructor ...');
    this.init();
  }

  init(){
    console.log('iniciando conexión ... en clase');
    //const MONGODB_CONNECTION: string = configApp.urlBD;
    mongoose.connect(database, {useMongoClient: true,});
  }
}



// export class DataDB{
//   constructor(){
//     console.log('DAtaDB constructor ...');
//     this.init();
//   }
//
//   init(){
//     console.log('iniciando conexión ... en clase');
//     const MONGODB_CONNECTION: string = configApp.urlBD;
//     mongoose.connect(MONGODB_CONNECTION, {useMongoClient: true,});
//   }
// }

//const dataDB = new DataDB();
//dataDB.init();

//export default dataDB;
//"urlBD": "mongodb://localhost:27017/heros"
