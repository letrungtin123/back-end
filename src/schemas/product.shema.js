import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		nameProduct: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		description:{
			type: String,
			required: false,
		},
	}
)
const Product = mongoose.model('Product', productSchema);
export default Product;