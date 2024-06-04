const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const db=process.env.MONGO_URL
mongoose.set('strictQuery', false);
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>console.log(err));