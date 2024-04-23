import express from 'express';
import mongoose from 'mongoose';
//import { createProxyMiddleware } from 'http-proxy-middleware';

import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

import categoryRouter from './routers/categoryRoutes.js';
import subcategoryRouter from './routers/subcategoryRoutes.js';
//import cors from 'cors';
dotenv.config();
const app = express();
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());


mongoose.connect(process.env.REACT_APP_API_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(res => console.log(" Database up and running::::: "))
  .catch(err => console.log("Sunday Ishaya Database error:: ", err))
  /*const apiProxy = createProxyMiddleware({
    target: 'https://ecommerce-websit-3.onrender.com',
    changeOrigin: true,
  });
  
  // Proxy requests to the API server
  app.use('/api', apiProxy);*/
 
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subcategoryRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/frontend/public/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Serve at http://localhost:${port}`));
