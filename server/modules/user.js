const {pool} = require('../dbsetup.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_I = 10;
const cookie = require('cookie-parser')
require('dotenv').config();

const createUser = (request, response) => {
    const { name, email,sdt,role,password } = request.body;
    bcrypt.hash(password,SALT_I,function(err,hash){
        const password_hash = hash;
        if(err) return err;
        pool.query('INSERT INTO users (name, email,sdt,role,password) VALUES ($1,$2,$3,$4,$5)', [name, email,sdt,role,password_hash], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send({
                success: true,
            })
        })
     })                   
};

const logoutUser = (request,response) =>{
    const { email ,password} = request.body;
}

const loginUser = (request,response) => {
    const {email,password} = request.body;
    pool.query('SELECT password AS cnt FROM users WHERE email = $1',[email],function(err,data){
        if(data.rowCount === 0){
            return(
                response.status(500).send({
                    errorCode : 2
                })
            )     
        } else{
            const hash_password = data.rows[0].cnt;
            if(hash_password){
                bcrypt.compare(password,hash_password,function(err,res){
                    if(res === false) {
                        response.status(500).send({
                            success : false
                        })
                    }else{
                        var user = this;
                            var token = jwt.sign({ foo: email+password }, process.env.SECRET)

                            // user.token = token;
                      
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

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id_user ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }




module.exports = { createUser,getUsers,loginUser}