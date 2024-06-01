import Product from "../schemas/product.shema.js";
import { isObjectIdOrHexString } from "mongoose";

export const findProducts = async () => {
    const products = await Category.find();
    return products;
};
export const createProductModel = async (body) => {
    const product =await Product.create(body);
    return product;
}
export const checkIsObjectIdOrHexString = (id) => {
    return isObjectIdOrHexString(id);
}

export const handleUpdateProduct = async (id,body) => {
    const product = await Product.findByIdAndUpdate(id,body, {new:true});
    return category;
}