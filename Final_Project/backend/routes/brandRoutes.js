const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

// Get all brands
router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get brand info by brand name
router.get("/:name", async (req, res) => {
    try {
        const brand = await Brand.findOne({ Name: req.params.name });
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;