const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }

        // if (isDefault) {
        //     // Unset other addresses as default
        //     await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });
        // }

        const newAddress = new Address({
            user: userId,
            address,
            city,
            pincode,
            notes,
            phone
        });

        await newAddress.save();

        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            address: newAddress
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const getAllAddress = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Addresses fetched successfully",
            addresses
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const updateAddress = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { addressId } = req.params;
        const updates = req.body;

        // if (updates.isDefault) {
        //     // Unset other addresses as default
        //     await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });
        // }

        const updatedAddress = await Address.findOneAndUpdate({ _id: addressId, user: userId },
            { ...updates },
            { new: true });

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: updatedAddress
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { addressId } = req.params;

        const deletedAddress = await Address.findOneAndDelete({ _id: addressId, user: userId });

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: deletedAddress
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

const setDefaultAddress = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { addressId } = req.params;

        await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });

        const updatedAddress = await Address.findOneAndUpdate({ _id: addressId, user: userId },
            { isDefault: true },
            { new: true });

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: updatedAddress
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

module.exports = { addAddress, getAllAddress, updateAddress, deleteAddress, setDefaultAddress };