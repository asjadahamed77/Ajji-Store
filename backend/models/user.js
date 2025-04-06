import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username:{
        type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid phone number."],
    },
    verifyOtp: {type: String, default: ""},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ""},
    resetOtpExpireAt: {type: Number, default: 0},
    address: {
        
            addressLine: {
              type: String,
              
            },
            city: {
              type: String,
           
            },
            postalCode: {
              type: String,
             
            },
            country: {
              type: String,
             
              default: "Sri Lanka"
            },
          },
    
  },
  {
    timestamps: true,
  }
);


const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;