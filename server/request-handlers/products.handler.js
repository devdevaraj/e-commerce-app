import productsModel from "../models/products.model.js";

export async function addProduct(req, res) {
    try {
        let { title, stock, description, category } = req.body;
        let { thumbnail, images } = req.files;
        thumbnail = thumbnail[0].filename;
        images = images.map(item => item.filename);
        await productsModel.create({
            title,
            thumbnail,
            stock,
            description,
            images,
            category
        })
        return res.status(201).json({
            msg: "Data resived!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}

export async function getProducts(req, res) {
    try {
        let { limit, sort, skip, category, select } = req.query;
        limit = limit ? limit : 100;
        sort = sort ? sort : "title";
        skip = skip ? skip : 0;
        category = category ? {category} : {};
        select = select ? {[select]:1} : {};
        let products = await productsModel.find(category,select).limit(limit).skip(skip).sort({ [sort]: 1 });
        if(products.length == 0) {
            return res.status(204).json({
                msg: "There is no products to show!",
                products
            })
        }
        return res.status(200).json({
            msg: `${products.length} Products found`,
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}

export async function getCategory(req, res) {
    try {
        let { field } = req.query;
        let category = await productsModel.distinct(field);
        return res.status(200).json({
            msg: "Request success!",
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}