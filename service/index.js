const express = require('express')
const run = require('./run')
const app = express()
const port = 3100

app.get('/', async function (req, res) {
  var body = req.body
  var nodes = JSON.parse(body)
  await run(body)
  res.send('Generated and committed Docker project')
})

app.listen(port, function () {
  console.log('Docker generator on port:', port)
})