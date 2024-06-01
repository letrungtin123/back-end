import * as dotenv from 'dotenv';

import cateoryRoutes from './routes/category.route.js';
import connectDb from './configs/connect-db.config.js';
import express from 'express';
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();

app.use(express.json()); 

connectDb();

app.use('/api/v1', cateoryRoutes);
app.use('/api/v1',productRoutes )
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

