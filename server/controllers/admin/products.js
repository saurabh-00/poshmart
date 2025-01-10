const { uploadImageToCloudinary } = require('../../helpers/cloudinary');

const productImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const folder = 'products';
        const result = await uploadImageToCloudinary(req.file.buffer, folder);

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || 'Image upload failed'
        });
    }
}

module.exports = { productImageUpload };