require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/controllers/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/controllers/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');


// connect to the database
connectDB();

// custom middleware logger
app.use((req, res, next) =>
{
    console.log(`${req.method} ${req.path}`);
    next();
});

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// form-data // 'Content-Type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static (css) file
app.use(express.static(path.join(__dirname, 'front_end', 'css')));


// routing
app.use('/(.html)?', require('./middleware/routes/main'));
app.use('/sign_up(.html)?', require('./middleware/routes/signUp'));
app.use('/register', require('./middleware/routes/register'));
app.use('/auth', require('./middleware/routes/auth'));
app.use('/refresh', require('./middleware/routes/refresh'));
app.use('/save_memo', require('./middleware/routes/refresh'));
app.use('/log_out', require('./middleware/routes/logOut'));
app.use(verifyJWT);
app.use('/users', require('./middleware/routes/users'));
app.use('/*', require('./middleware/routes/otherRoutes'));

app.use(errorHandler);

mongoose.connection.once('open', ()=>
{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});