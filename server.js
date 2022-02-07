const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressjwt = require("express-jwt")
const secret = process.env.SECRET || "Bobs Burger"


const PORT = process.env.PORT || 9000;
// ... other imports
const path = require("path")
app.use(express.static(path.join(__dirname, "client", "build")))



app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/rockthevotedb",
  {
    useNewUrlParser: true,
   
  },

  () => console.log('Connected to the rtv DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use("/api/users", require("./routes/userRouter.js"))

app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})


// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(PORT, () => {
  console.log(`Server is running on local port `)
})