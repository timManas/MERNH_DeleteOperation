import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Initialize dotenv
dotenv.config()

// Initilize Express App
const app = express()

// Initialize MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log('Success')
      })
  } catch (error) {
    console.log('Error on connecting to DB')
    process.exit(1)
  }
}

// Connect DB
connectDB()

const __dirname = path.resolve()

// Set up routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    app.use(express.static(path.join(__dirname, '/frontend/build'))) // set frontend folder as a static folder

    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Route is connected')
  })
}

// App Listn
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to Port: ${PORT}`))
