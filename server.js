const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
app.use(cors())
//Connect Database
connectDB()

//init middlewares
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Api Running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
