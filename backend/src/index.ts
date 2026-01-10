import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.router.js';
import productRoute from './routes/product.route.js';
import categoryRoute from './routes/cat.route.js';
import vairantRoute from './routes/variant.route.js';
import homeRoute from './routes/home/nav.route.js';
import ShippingRoute from './routes/user.route.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowedorigin = ['http://localhost:5173', 'http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedorigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);
const port = process.env.port || 5000;

app.use('/api/v1', authRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/variant', vairantRoute);
app.use('/api/v1/home', homeRoute);
app.use('/api/v1/user/userdetails', ShippingRoute);
app.use((req, res, next) => next({ status: 404, message: 'route not found' }));
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const status = (err as { status?: number }).status || 500;
  const message = (err as { message?: string }).message || 'internal server error';
  const success = false;
  res.status(status).json({ message, success });
});

app.listen(port, () => {
  console.log(`Server app listening on port ${process.env.port}`);
});
