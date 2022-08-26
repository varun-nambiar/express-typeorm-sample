import express from 'express'
import { DataSource } from 'typeorm'

import dotenv from 'dotenv'
import Users from './entity/Users'
dotenv.config()

const connection = new DataSource({
  // mysql example
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,

  logging: ["query", "schema", "error", "warn", "log", "migration"],
  entities: [
    __dirname + "/entity/*.ts",
    __dirname + "/entity/*.js"
  ],
})

connection.initialize().then(() => {
  console.log('Database connected')
}, error => {
  console.error('Database connection failed', error.message)
})

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT ? +process.env.PORT : 3000;
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

// get all records
app.get('/user', async (req, res) => {
  const users = await Users.find()
  return res.json(users)
})

// create new record
app.get('/user/new', async (req, res) => {
  const user = new Users()
  user.email = `john${Math.round(Math.random() * 100)}@example.com`
  user.first_name = `John`
  user.last_name = `Doe`
  await user.save()
  return res.json(user)
})

// find last registered email
app.get('/user/last', async (req, res) => {
  const userEmail = await Users.findLastEmail()
  return res.json(userEmail)
})
