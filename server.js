const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { port, mongoURI } = require('./config')
const routes = require('./routes/todoList')
const authRoutes = require('./routes/auth');

const app = express()


app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/todoList', routes)
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data =  error.data;
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log('MondoDb connection failed: ', err))

app.get('/', (req, res, next) => res.send('hello world'))

app.listen(port, () => console.log('Express is running at port ' + port))
