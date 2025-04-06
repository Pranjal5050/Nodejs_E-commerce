const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const usersRouter = require("./router/usersRouter");
const productsRouter = require("./router/productsRouter");
const ownersRouter = require("./router/ownersRouter");
const indexRouter = require("./router/index");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.JWT_KEY,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);

app.listen(3000);