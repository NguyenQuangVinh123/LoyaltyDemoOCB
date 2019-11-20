const {pool} = require('../dbsetup.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_I = 10;
const cookie = require('cookie-parser')
require('dotenv').config();

const createCustomer = (request, response) => {
    const { name_customer, email_customer,phone_customer,
        address_customer,password_customer,point_customer } = request.body;
    bcrypt.hash(password_customer,SALT_I,function(err,hash){
        const password_hash = hash;
        if(err) return err;
        pool.query('INSERT INTO customers (name_customer, email_customer,phone_customer,address_customer,point_customer,password_customer) VALUES ($1,$2,$3,$4,$5,$6) returning *', [name_customer, email_customer,phone_customer,address_customer,point_customer,password_hash], (error, results) => {
            if(error){
                if (error.code === '23505') {
                    return(response.status(500).send({
                        errorCode: 3,
                    }))
                }
            }else{
                response.status(200).send({
                    success: true,
                    data : results.rows[0]
                })
            }
        })
     })                   
};
const loginCustomer = (request,response) => {
    const {email_customer,password_customer} = request.body;
    pool.query('SELECT password_customer AS cnt FROM customers WHERE email_customer = $1',[email_customer],function(err,data){
        console.log(data)
        if(data.rowCount === 0){
            return(
                response.status(500).send({
                    errorCode : 2
                })
            )     
        } else{
            const hash_password = data.rows[0].cnt;
            if(hash_password){
                bcrypt.compare(password_customer,hash_password,function(err,res){
                    if(res === false) {
                        response.status(500).send({
                            success : false
                        })
                    }else{
                            var token = jwt.sign({ foo: email_customer+password_customer }, process.env.SECRET)                      
                            if(err) return response.status(400).send(err);
                            response.cookie('w_auth',token)
                            response.status(200).send({
                                success : true,
                                token : token
                        })
                    }
                })
            }
        }
    });   
};

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customers ORDER BY id_customer ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({data:results.rows})
    })
}

const getCustomerByIDCustomer = (request, response) => {
    const id_customer = parseInt(request.params.id_customer)
  
    pool.query('SELECT * FROM customers WHERE id_customer = $1', [id_customer], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}




module.exports = { 
    createCustomer,
    getCustomers,
    loginCustomer,
    getCustomerByIDCustomer
}