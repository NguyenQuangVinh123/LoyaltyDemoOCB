const {pool} = require('../dbsetup.js');

const createProduct = (request, response) => {
     const image = request.file.path;
    const { name_product, point_needed_product,hot_inweek_product,remaining_amount_product,dateto,datefrom,description} = request.body;
        pool.query('INSERT INTO products (name_product, point_needed_product,hot_inweek_product,remaining_amount_product,image,dateto,datefrom,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *', 
        [name_product, point_needed_product,hot_inweek_product,remaining_amount_product,image,dateto,datefrom,description], (error, results) => {
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
    const requests = request.body.changeImage
    
    if(requests === "true"){
        const image = request.file.path;
        const {name_product, point_needed_product,hot_inweek_product , id_product,remaining_amount_product,status,dateto,datefrom,description} = request.body;
        if(Object.keys(request.body).length < 5){
            response.status(400).send({
                errorCode : 'Some field is missing'
            })
        }else{
            pool.query(`UPDATE products
            SET name_product= $1,point_needed_product=$2,hot_inweek_product=$3,remaining_amount_product= $4,status = $5,image= $6,dateto= $7,datefrom = $8,description = $9
            WHERE id_product=$10 returning *`,[name_product, point_needed_product,hot_inweek_product ,remaining_amount_product,status,image,id_product,dateto,datefrom,description],function(err,data){
                if(err) throw err;
                response.status(200).send({
                    success: true,
                    data : data.rows[0]
                })
            })
        }
    }else{
        const {name_product, point_needed_product,hot_inweek_product , id_product,remaining_amount_product,status,dateto,datefrom,description} = request.body;
        if(Object.keys(request.body).length < 4){
            response.status(400).send({
                errorCode : 'Some field is missing'
            })
        }else{
            pool.query(`UPDATE products
            SET name_product= $1,point_needed_product=$2,hot_inweek_product=$3,remaining_amount_product= $4,status = $5,dateto = $6,datefrom = $7,description = $8
            WHERE id_product=$9 returning *`,[name_product, point_needed_product,hot_inweek_product ,remaining_amount_product,status,dateto,datefrom,description,id_product],function(err,data){
                if(err) throw err;
                response.status(200).send({
                    success: true,
                    data : data.rows[0]
                })
            })
        }
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