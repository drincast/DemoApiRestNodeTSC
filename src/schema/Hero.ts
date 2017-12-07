import { Schema } from "mongoose";

export var heroSchema: Schema = new Schema({
  createAt: Date,
  id: Number,
  name: String,
  aliases: String,
  occupation: String,
  gender: String,
  height: String,
  hair: String,
  eyes: String,
  powers: String
});

heroSchema.pre("save", (next) =>{
  if(!this.createAt){
    this.createAt = new Date();
  }
});
