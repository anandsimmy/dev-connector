const express= require('express');
const { connect } = require('mongoose');
const connectDB= require('./config/db');

const app= express();
connectDB();

app.get('/', (req, res)=>{
    res.send('API is running');
})

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})