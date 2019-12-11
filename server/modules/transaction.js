const {pool} = require('../dbsetup.js');
const async = require('async')
const exchangeProductCart = (request , response) => {
    const { id_customer,total_point,quantity} = request.body;
    pool.query('SELECT point_customer as cnt FROM customers WHERE id_customer = $1', [id_customer],(err,results) =>{
        if(err) throw err;
        var point_customer = parseInt(results.rows[0].cnt);
        if(point_customer < total_point){
            return(response.status(400).send({
                errorCode : 'Your points not enough'
            }))
        }else{
            pool.query('SELECT point_customer as cnt FROM customers WHERE id_customer = $1',[id_customer],(err,results)=>{
                if(err) throw err;
                var point_customer = parseInt(results.rows[0].cnt);
                if(point_customer < total_point){
                    return(response.status(400).send({
                        errorCode : 'Your points not enough'
                    }))
                }else {
                    pool.query('INSERT INTO transaction(id_customer,total_point,date_transaction) VALUES ($1,$2,$3) returning id_transaction',[id_customer,total_point,new Date()],(err,results)=>{
                        if(err) throw err;
                        var id_transaction = results.rows[0].id_transaction;
                        async.series([
                            function(callback) {
                                async.eachSeries(quantity,function(i,callback1){
                                    var id_product_number = i.id_product;
                                    var  quantity_number= parseInt(i.sl);
                                    pool.query('SELECT *  FROM products where id_product = $1',[i.id_product],(err,results)=>{
                                            if(err) throw err;
                                            var remaining_amount_product = parseInt(results.rows[0].remaining_amount_product);
                                            var point_needed_product = parseInt(results.rows[0].point_needed_product);

                                                if(remaining_amount_product < quantity_number || quantity_number === 0){ 
                                                    callback1(true)
                                                     
                                                    return(
                                                        response.status(400).send({
                                                            errorCode : 'Not enough amouth'
                                                    }))
                                                   
                                                     
                                                }else{
                                                  
                                                        pool.query('INSERT INTO details_transactions (id_transaction,id_product,amount,quantity) VALUES  ($1,$2,$3,$4) returning *',
                                                        [id_transaction,id_product_number,point_needed_product,quantity_number],(err,results)=>{
                                                            if(err) throw err;
                                                        })
                                                        pool.query('UPDATE products SET remaining_amount_product = $1 where id_product = $2 returning *',
                                                        [remaining_amount_product - quantity_number,id_product_number],(err,results) =>{
                                                        if(err) throw err;
                                                        })    
                                                        callback1(null) 
 
                                                }
                                               
                                                 

                                    }),function(err) {
                                      console.log(err)
                                       
                                    }

                                })
                                callback(null)       
                            },
                            function(callback) {
                                pool.query('UPDATE transaction SET point_after_change= $1 WHERE id_transaction = $2 returning *',[point_customer - total_point,id_transaction],(err,results)=>{
                                            if(err) throw err;                 
                                                const point_after_exchanges = results.rows[0].point_after_change;
                                            pool.query('UPDATE customers SET point_customer= $1 where id_customer = $2 returning *',[point_after_exchanges,id_customer],(err,results) =>{
                                                    if(err) throw err;
                                            });    
                                }) 
                                callback(null)
                                return(
                                        response.status(200).send({
                                               success : true,
                                               data : results.rows[0]
                                        })
                                )
                               
                            }
                        ],
                        function(err, results) {
                            // console.log(err,results)
                            // results is now equal to ['one', 'two']
                        });
                    })
                } 
            })
        }

    })
}

const exchangeProduct = (request , response) =>{
    const{id_customer,id_product,total_point} = request.body;
    pool.query('SELECT point_customer as cnt FROM customers WHERE id_customer = $1',[id_customer],(err,results) =>{
        if(err) throw err;
        var point_customer = parseInt(results.rows[0].cnt);
        if(point_customer < total_point){
            return(response.status(400).send({
                errorCode : 3
            }))
        } else{
            pool.query('SELECT * FROM products WHERE id_product = $1',[id_product],(err,results)=>{
                var amount = results.rows[0].point_needed_product;
                var remaining_amount_product = results.rows[0].remaining_amount_product
           
                pool.query('INSERT INTO transaction(id_customer,total_point,date_transaction,point_after_change) VALUES ($1,$2,$3,$4) returning id_transaction',[id_customer,total_point,new Date(),point_customer-total_point],(err,results)=>{
                    var id_transaction = results.rows[0].id_transaction;
                    pool.query('INSERT INTO details_transactions(id_transaction,id_product,amount,quantity) VALUES ($1,$2,$3,$4)',[id_transaction,id_product,amount,1],(err,results)=>{
                        if(err) throw err;
                    })
                    pool.query('UPDATE customers SET point_customer= $1 where id_customer = $2 returning *',[point_customer-total_point,id_customer],(err,results) =>{
                       
                        if(err) throw err;
                    })
                    pool.query('UPDATE products SET remaining_amount_product = $1 where id_product = $2 returning *',
                    [remaining_amount_product - 1,id_product],(err,results) =>{
                        if(err) throw err;
                    })    
                    response.status(200).send({
                        success : true,
                        data : results.rows[0]
                    })
                })

            })
        }
    })

}


module.exports = { 
    exchangeProduct,
   
}