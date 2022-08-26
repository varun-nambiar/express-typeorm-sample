import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server up at http://localhost:${port}`);
})

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello World',
    ip: req.ip,
    browser: req.headers['user-agent']
  })
})
