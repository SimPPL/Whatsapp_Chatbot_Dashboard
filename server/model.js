const mongoose = require('mongoose')

const QueSchema = new mongoose.Schema({ 
    mobile_num: Number, 
    question: String,
    answer: String
},{timestamps:true}); 

const QueData = mongoose.model("spriha_quest_ans", QueSchema);
module.exports = QueData;