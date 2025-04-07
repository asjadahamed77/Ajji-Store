import userModel from "../models/user.js";

export const editUser = async (req, res) => {
    try {
      const {id} = req.params;
      
      
      const { name, phone, addressLine, city, postalCode, country } = req.body;
console.log("Request Body:", name);
 
  
      if (!id) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { name, phone, address: {
            addressLine,
            city,
            postalCode,
            country,
          }, },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.json({
        success: true,
        message: "Profile updated successfully.",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Edit User Error:", error);
      res.status(500).json({ success: false, message: "Failed to edit profile." });
    }
  };
  