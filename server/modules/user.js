const {pool} = require('../dbsetup.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_I = 10;
const cookie = require('cookie-parser')
require('dotenv').config();

const createUser = (request, response) => {
    const { name, email,sdt,role,password ,status} = request.body;
    bcrypt.hash(password,SALT_I,function(err,hash){
        const password_hash = hash;
        if(err) return err;
        pool.query('INSERT INTO users (name, email,sdt,role,password,status) VALUES ($1,$2,$3,$4,$5,$6) returning *', [name, email,sdt,role,password_hash,status], (error, results) => {
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
const loginUser = (request,response) => {
    const {email,password} = request.body;
    pool.query('SELECT *  FROM users WHERE email = $1',[email],function(err,data){
        if(data.rowCount === 0){
            return(
                response.status(500).send({
                    errorCode : 2
                })
            )     
        } else{
            const hash_password = data.rows[0].password;
            if(hash_password){
                bcrypt.compare(password,hash_password,function(err,res){
                    if(res === false) {
                        response.status(500).send({
                            success : false,
                        })
                    }else{
                            var token = jwt.sign({ foo: email+password }, process.env.SECRET)
                            if(err) return response.status(400).send(err);
                            response.cookie('w_auth',token)
                            response.status(200).send({
                                success : true,
                                token : token,
                                data : data.rows[0]
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
      response.status(200).json({data:results.rows})
    })
}
const getUserByIDUser = (request, response) => {
    const id_user = parseInt(request.params.id_user)
  
    pool.query('SELECT * FROM users WHERE id_user = $1', [id_user], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}



module.exports = { 
    createUser,
    getUsers,
    loginUser,
    getUserByIDUser
}