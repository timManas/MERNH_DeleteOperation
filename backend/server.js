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

// Initialize the Routes
if (process.env.NODE_ENV === 'production') {
  // Set the 'build' folder as a static folder
  // Why ? So we can access the build folder and load the index.html
  app.use(express.static(path.join(__dirname, '/frontend/build'))) // set frontend folder as a static folder

  // Send the index.html file if on Production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running ....')
  })
}

// App Listn
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to Port: ${PORT}`))
