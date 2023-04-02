import mongoose from "mongoose";

const { Schema } = mongoose;

const JokeSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("joke", JokeSchema);
