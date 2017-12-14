import * as mongoose from 'mongoose';
const configApp = require('../configApp');

export class DataDB{
  constructor(){
    console.log('DAtaDB constructor ...');
    this.init();
  }

  init(){
    console.log('iniciando conexión ... en clase');
    const MONGODB_CONNECTION: string = configApp.urlBD;
    mongoose.connect(MONGODB_CONNECTION, {useMongoClient: true,});
  }
}

//const dataDB = new DataDB();
//dataDB.init();

//export default dataDB;
//"urlBD": "mongodb://localhost:27017/heros"
