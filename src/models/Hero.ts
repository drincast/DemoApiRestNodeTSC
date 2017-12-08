import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  id: {
    type: String,
  },

  name: {
    type: String,
    required: true
  },

  aliases: {
    type: String,
  },

  occupation: {
    type: String,
  },

  gender: {
    type: String,
  },

  height: {
    type: String,
  },

  hair: {
    type: String,
  },

  eyes: {
    type: String,
  },

  powers: {
    type: String,
  }
});

export default mongoose.model('Hero', HeroSchema);
