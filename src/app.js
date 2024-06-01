import * as dotenv from 'dotenv';

import cateoryRoutes from './routes/category.route.js';
import connectDb from './configs/connect-db.config.js';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.json()); 

connectDb();

app.use('/api/v1', cateoryRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

