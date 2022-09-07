const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors') 
const app = express()

app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

// Express Routing:
const toyRoutes = require('./api/toy.controller')

app.use('/api/toy', toyRoutes)

app.listen(3030, () => console.log('Server ready at port 3030!'))

