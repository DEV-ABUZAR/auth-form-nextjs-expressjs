const userModel = require('../src/db/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = 'mysecretkey';

const register = async (req, res) => {
  const { fName, lName, username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
      fName: fName,
      lName: lName
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    console.log("registered")
    res.status(201).json({ user: result, token: token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something went wrong" })
  }
}
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const matchPassword = await bcrypt.compare(password, existingUser.password);
      if (!matchPassword) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret);
      console.log("User logged in successfully");
      res.status(200).json({ user: existingUser, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  


module.exports = { register,  Login }
