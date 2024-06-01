import * as dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const connectDb = () => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => {
			console.log('Connected to the database!');
		})
		.catch((error) => {
			console.log('Cannot connect to the database!', error);
		});
};

export default connectDb;