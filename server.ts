import express from 'express';
import cors from 'cors';
import { router } from './src/routes';
import 'dotenv/config';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL!);

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
