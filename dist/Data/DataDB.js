"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const configApp = require('../configApp');
class DataDB {
    constructor() {
        console.log('DAtaDB constructor ...');
        this.init();
    }
    init() {
        console.log('iniciando conexión ... en clase');
        const MONGODB_CONNECTION = configApp.urlBD;
        mongoose.connect(MONGODB_CONNECTION, { useMongoClient: true, });
    }
}
exports.DataDB = DataDB;
//const dataDB = new DataDB();
//dataDB.init();
//export default dataDB;
