const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageToCloudinary = (buffer, folder = null) => {
    return new Promise((resolve, reject) => {
        const options = folder ? { folder } : {};
        const stream = cloudinary.uploader.upload_stream({
            ...options,
            resource_type: 'image',
            allowed_formats: ["gif", "png", "jpg", "bmp", "ico", "tiff", "jpc", "jp2", "psd", "webp", "svg", "wdp", "djvu", "ai", "flif", "bpg", "miff", "tga", "heic"]
        },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const upload = multer({ storage: multer.memoryStorage() });

module.exports = { uploadImageToCloudinary, upload };