const express = require('express')
const app = express()
const cors = require('cors');
const conn = require ('./src/db/conn')

const {register, Login} = require('./controller/auth')
const port =   process.env.PORT ||    8000


app.use(cors());
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello Worlds')
})



app.post('/register', register);
app.post('/Login', Login);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   