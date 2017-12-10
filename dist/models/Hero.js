"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var HeroSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    aliases: {
        type: [String],
    },
    occupation: {
        type: String,
    },
    gender: {
        type: String,
    },
    height: {
        type: Schema.Types.Mixed,
    },
    hair: {
        type: String,
    },
    eyes: {
        type: String,
    },
    powers: {
        type: [String],
    }
});
exports.default = mongoose.model('Hero', HeroSchema);
