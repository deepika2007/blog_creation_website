const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3001

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('stablish')
})

const server = app.listen(PORT, () => {
  console.log(`connection setup at ${PORT}`)
})
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('shutting down')
  server.close(() => {
    process.exit(1)
  })
})