import * as express from 'express';
// import express = require('express');


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  return res.json({
    message: 'Hello World',
    ip: req.ip,
    browser: req.headers['user-agent']
  })
})


app.listen(3000, '0.0.0.0', () => {
  console.log('Server up')
})

