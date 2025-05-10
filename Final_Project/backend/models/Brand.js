const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Name: String,
    Cost: Number,
    Type: String,
    Image: String,
});

const BrandSchema = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Logo: String,
        Products: [ProductSchema],
    },
    { 
        collection: "product_information",
        versionKey: false
    }
);

module.exports = mongoose.model("Brand", BrandSchema);