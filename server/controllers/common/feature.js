const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;

        const featureImage = new Feature({
            image
        });

        await featureImage.save();

        return res.status(201).json({
            success: true,
            message: "Feature image added successfully",
            data: featureImage
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
};

const getFeatureImages = async (req, res) => {
    try {
        const featureImages = await Feature.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Feature images fetched successfully",
            data: featureImages
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
};

module.exports = { addFeatureImage, getFeatureImages };