const mongoose= require('mongoose');
const config= require('config');

const dbURL= config.get('mongoURI');

const connectDB= async () => {
    try{
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch(err){
        console.log(err.message);
        //Exit process if there is failure
        process.exit(1);
    }

}

module.exports= connectDB;