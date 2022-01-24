const Product = require('../models/product')

const getProductsStatic = async (req, res) => {
    const data = await Product.find({}).sort('name')
    res.status(200).json({data, nbHits: data.length})
}

const getProducts = async (req, res) => {

    const {featured ,company, name,sort} = req.query
    const queryParams = {}
    if(featured){
        queryParams.featured = featured === 'true' ? true : false
    }
    if(company){
        queryParams.company = company
    }
    if(name){
        queryParams.name = {$regex : name, $options: 'i'}
    }
    let products =  Product.find(queryParams).sort(sort)
    if(sort){
       const sortList = sort.split(',').join(' ');
       products = products.sort(sortList)
    }else{
        products = products.sort('createdAd')
    }
    const data = await products

    res.status(200).json({data, nbHits: data.length})
}





module.exports = {getProducts, getProductsStatic}
