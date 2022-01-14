const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('MongoDB conection error', err)
  process.exit
})
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})