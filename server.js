const express= require('express');
const { connect } = require('mongoose');
const connectDB= require('./config/db');

const app= express();

//Connecting Database
connectDB();

app.get('/', (req, res)=>{
    res.send('API is running');
})

//Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})