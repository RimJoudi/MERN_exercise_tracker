//requiring what we gonna need
const express = require('express');
const cors = require('cors'); // cross origine ressource sharing(cors) => interact with the ()
const mongoose = require('mongoose'); // allow us to connect to our database(MongoDB)

require('dotenv').config(); // so we can have env variables in the dotenv file

// create the express server
const app = express();
const port = process.env.PORT || 5000;

// cors middlewear 
app.use(cors());
app.use(express.json()); // allow us to parse json because our server will be sending and receiving json

// after setting the middlewear
// deal with mongoDB
const uri = process.env.ATLAS_URI; //database uri from MGDB, for the connection we have to set env var "ATLAS_URI"
mongoose.connect(uri, async(err)=>{
    if(err) throw err;
    console.log("conncted to db")
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// require the files(importing)
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


// use the files
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



// what starts the server: starts to listen on a cetain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

