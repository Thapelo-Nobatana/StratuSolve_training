import dotenv from 'dotenv';

dotenv.config()

import mySQL from 'mysql2/promise';
// import 'dotenv';
// require('dotenv').config();

const dataBase = mySQL.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
);
  



export default dataBase;