const {pool} = require('../dbsetup.js');

const createProduct = (request, response) => {
    const { name_product, point_needed_product,hot_inweek_product,remaining_amount_product } = request.body;
   
        pool.query('INSERT INTO products (name_product, point_needed_product,hot_inweek_product,remaining_amount_product) VALUES ($1,$2,$3,$4) returning *', [name_product, point_needed_product,hot_inweek_product,remaining_amount_product], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send({
                success: true,
                data : results.rows[0]
            })
        })
};

const deleteProduct = (request,response) => {
    const {id_product} = request.body;
    pool.query('DELETE FROM products WHERE id_product = $1',[id_product],function(err,data){
        if(err) throw err;
        response.status(200).send({
            success: true,
        })
    });     
};

const updateProduct = (request,response) => {
    const {name_product, point_needed_product,hot_inweek_product , id_product,remaining_amount_product,status} = request.body;
    if(Object.keys(request.body).length < 6){
        response.status(400).send({
            errorCode : 'Some field is missing'
        })
    }else{
        pool.query(`UPDATE products
        SET name_product= $1,point_needed_product=$2,hot_inweek_product=$3,remaining_amount_product= $4,status = $5
        WHERE id_product=$6 returning *`,[name_product, point_needed_product,hot_inweek_product ,remaining_amount_product,status,id_product],function(err,data){
            if(err) throw err;
            response.status(200).send({
                success: true,
                data : data.rows[0]
            })
        })
    }
}

const getProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY id_product ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({data:results.rows})
    })
}

const getProductByIDProduct = (request, response) => {
    const id_product = parseInt(request.params.id_product)
  
    pool.query('SELECT * FROM products WHERE id_product = $1', [id_product], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = { 
    updateProduct,
    createProduct,
    deleteProduct,
    getProducts,
    getProductByIDProduct
}