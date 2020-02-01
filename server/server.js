const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const { check, validationResult } = require('express-validator');
const path = require('path');

const app = express()
const port = process.env.PORT | 3001;
const cors = require('cors')
const {createUser,getUsers,updateUser,loginUser,getUserByIDUser,deleteUser} = require('./modules/user.js');
const {createCustomer,getCustomers,loginCustomer,getCustomerByIDCustomer} = require('./modules/customer.js');
const {createProduct,deleteProduct,updateProduct,getProducts,getProductByIDProduct} = require('./modules/product.js');
const {exchangeProduct} = require('./modules/transaction.js');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() )
    }
})
const upload = multer({storage : storage})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use('/uploads',express.static("uploads"))

//Middlewares

app.use(cookieParser());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.post('/api/users/register',createUser)
app.post('/api/users/login',loginUser)
app.get('/api/users',getUsers)
app.get('/api/users/:id_user',getUserByIDUser)
app.post('/api/users/update',updateUser)
app.post('/api/users/delete',deleteUser)

////CUSTOMER
app.post('/api/customers/register',createCustomer)
app.post('/api/customers/loginCustomer',loginCustomer)
app.get('/api/customers',getCustomers)
app.get('/api/customers/:id_customer',getCustomerByIDCustomer)


////PRODUCT
app.post('/api/product/add',upload.single('image'),createProduct)
app.post('/api/product/delete',deleteProduct)
app.post('/api/product/update',upload.single('image'),updateProduct)
app.get('/api/products/:id_product',getProductByIDProduct)
app.get('/api/products?',getProducts)

////TRANSACTION
app.post('/api/transaction',exchangeProduct)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
