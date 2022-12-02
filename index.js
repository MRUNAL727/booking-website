import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

console.log(path.join(__dirname, 'client', 'build'));
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};

//middlewares

// app.use(cors(
//   {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// ));

app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, './client/build')));
     console.log(__dirname);
  app.get('*', function (_, res) {
    res.sendFile(
      path.join(__dirname, './client/build/index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
// }

app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log('Connected to backend.');
});
