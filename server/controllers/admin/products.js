const { uploadToCloudinary } = require('../../helpers/cloudinary');

const handleUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            url: result.secure_url
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || 'File upload failed'
        });
    }
}

module.exports = { handleUpload };