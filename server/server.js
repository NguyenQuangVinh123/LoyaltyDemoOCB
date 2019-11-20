const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const { check, validationResult } = require('express-validator');

const app = express()
const port = process.env.PORT | 3001;
const {createUser,getUsers,loginUser,getUserByIDUser} = require('./modules/user.js');
const {createCustomer,getCustomers,loginCustomer,getCustomerByIDCustomer} = require('./modules/customer.js');
const {createProduct,deleteProduct,updateProduct,getProducts,getProductByIDProduct} = require('./modules/product.js');
const {exchangeProduct} = require('./modules/transaction.js');



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
app.get('/api/users/:id_user',getUserByIDUser)

////CUSTOMER
app.post('/api/customers/register',createCustomer)
app.post('/api/customers/login',loginCustomer)
app.get('/api/customers',getCustomers)
app.get('/api/customers/:id_customer',getCustomerByIDCustomer)


////PRODUCT
app.post('/api/product/add',createProduct)
app.delete('/api/product/delete',deleteProduct)
app.post('/api/product/update',updateProduct)
app.get('/api/products/:id_product',getProductByIDProduct)
app.get('/api/products',getProducts)

////TRANSACTION
app.post('/api/transaction',exchangeProduct)





app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
