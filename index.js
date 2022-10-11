const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 4000
const fs = require('fs')
const cors = require('cors')
var xss = require('xss-clean')
const helmet = require('helmet')
var multer = require('multer')
var upload = multer()
var bodyParser = require('body-parser')

const projects = require('./routes/projectsRoute')

app.use(express.static(path.resolve(__dirname, './views')))

// middleware
// for parsing application/json
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
//form-urlencoded

app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(xss())

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views', 'index.html'))
})

// routes
app.use('/api/v1', projects)

app.listen(port, () => console.log(`OCR app is listening on port ${port}!`))
