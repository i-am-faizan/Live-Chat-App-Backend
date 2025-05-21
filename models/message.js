const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    enum: ['me', 'other']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  participants: [String], // Array to store the names of chat participants
  messages: [messageSchema] // Array of messages using the defined message schema
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;