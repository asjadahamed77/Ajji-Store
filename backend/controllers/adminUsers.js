import userModel from "../models/user.js";

export const fetchUsersAdmin = async(req,res)=>{
    try {
        const users = await userModel.find({}).select("-password");
        if (!users) {
            return res.status(404).json({ success: false, message: "No users found." });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Fetch User Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch users." });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
      console.error("Delete User Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete user." });
    }
  };
  