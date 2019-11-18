const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT | 3001;
const {createUser,getUsers,loginUser} = require('./modules/user.js')
//middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
/////USERS
app.post('/api/users/register',createUser)
app.post('/api/users/login',loginUser)
app.get('/api/users',getUsers)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
