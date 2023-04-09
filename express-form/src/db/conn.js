const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/auth-form', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  
}).then(() => {
  console.log(`Connection is successful`);
}).catch((error) => {
  console.log(`Connection error: ${error}`);
});

const registerSchema =  new mongoose.Schema({
  fName: {
    type: String,
    required: false
  },
  lName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const UserModel = new mongoose.model("user",registerSchema )
module.exports = UserModel;
