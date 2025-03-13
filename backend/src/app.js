import express from 'express';
import routes from './routes/index.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api', routes);

app.use(errorMiddleware);

export default app;
