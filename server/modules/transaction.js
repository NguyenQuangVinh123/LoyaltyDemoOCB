const {pool} = require('../dbsetup.js');
const exchangeProduct = (request , response) => {
    const { id_product,id_customer,total_point,quantity} = request.body;
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
                        for(var i = 0 ; i < quantity.length;i++){
                        // console.log(quantity[i].sl)
                            var quantity_number = quantity[i].sl;
                            var id_product_number = quantity[i].id_product;
                            pool.query('SELECT *  FROM products where id_product = $1',[quantity[i].id_product],(err,results)=>{
                                    if(err) throw err;
                                    var remaining_amount_product = parseInt(results.rows[0].remaining_amount_product);
                                    var point_needed_product = parseInt(results.rows[0].point_needed_product);
                                    if(remaining_amount_product < quantity_number || quantity_number === 0){           
                                        return(
                                            response.status(400).send({
                                                errorCode : 'Not enough amouth'
                                        }))
                                    }else{
                                            pool.query('INSERT INTO details_transactions (id_transaction,id_product,amount,quantity) VALUES  ($1,$2,$3,$4) returning *',[id_transaction,id_product_number,quantity_number,point_needed_product],(err,results)=>{
                                                if(err) throw err;
                                            })          
                                    }
                                    pool.query('UPDATE products SET remaining_amount_product = $1 where id_product = $2 returning *',[remaining_amount_product - quantity_number,id_product_number],(err,results) =>{
                                        if(err) throw err;
                                    })
                            })
                        }
                        // pool.query('UPDATE transaction SET point_after_change= $1 WHERE id_transaction = $2 returning *',[point_customer - total_point,id_transaction],(err,results)=>{
                        //     if(err) throw err;                 
                        //         const point_after_exchanges = results.rows[0].point_after_change;
                        //     pool.query('UPDATE customers SET point_customer= $1 where id_customer = $2 returning *',[point_after_exchanges,id_customer],(err,results) =>{
                        //             if(err) throw err;
                        //     });    
                        // }) 
                        //  return(
                        //      response.status(200).send({
                        //         success : true,
                        //         data : results.rows[0]
                        //     })
                        // ) 
                        
                    })
                    


                }
                
                
                
            })
        }
            
        
    })
}

module.exports = { 
    exchangeProduct,
   
}