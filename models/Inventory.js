const mongoose = require('mongoose');
//const { type } = require('os');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({

    medicineName : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required :true
    },

    price : {
        type : Number,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    expiryDate : {
        type : Date,
        required : true
    },

    supplier : {
        type : String,
        required : true
    }
})

const Inventory = mongoose.model("Inventory" , inventorySchema);

module.exports = Inventory; 