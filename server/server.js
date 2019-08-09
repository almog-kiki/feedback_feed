import express from "express";
import dotenv from "dotenv";
const mongoose = require('mongoose');
dotenv.config();

const bodyParser = require('body-parser');
const app = express();
const post = require('./routes/post.route');
const user = require('./routes/user.route');


const mongodbUrl = process.env.MONGODB_URL + process.env.MONGODB_NAME
const mongoDB = mongodbUrl || 'mongodb://127.0.0.1/cdi_test';
mongoose.connect(mongoDB, { useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false});
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/v1/post', post);
app.use('/api/v1/user', user);


const port = process.env.PORT || 8081;
app.listen(port, function() {
    console.log("Server listening at http://%s:%s", "localhost", port);
});
