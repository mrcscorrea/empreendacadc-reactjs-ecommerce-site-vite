import mongoose from "mongoose";

const coinsSchema = new mongoose.Schema({
    email : {
        type : Boolean,
        default : ""
    },
    amount : {
        type : Number,
        default : "850"
    },

},{
    timestamps : true
})

const CoinsModel = mongoose.model('coins',coinsSchema)

export default CoinsModel