import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs"; 
import { editUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ showUserProfile, setShowUserProfile }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false);
  const modalRef = useRef();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    addressLine: user.address?.addressLine || '',
    city: user.address?.city || '',
    postalCode: user.address?.postalCode || '',
    country: user.address?.country || '',
  });

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowUserProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    dispatch(editUser({id: user._id, ...formData}))
    setEditMode(false);
  };

  const handleMyOrders = ()=>{
    setShowUserProfile(false)
    navigate('/my-orders')
  }

  return (
    showUserProfile && (
      <div className="fixed inset-0 backdrop-blur-3xl bg-blue-900/5 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="lg:w-[500px] sm:w-[425px] max-h-[90vh] overflow-y-scroll border bg-blue-950/30 border-blue-50 w-[350px] flex flex-col backdrop-blur-[500px] rounded-[8px] shadow-lg px-4 py-6"
        >
          <h1 className="text-xl text-white">
            Hello <span className="font-semibold">{user.name},</span>
          </h1>
          <p className="text-white">
            Joined on{" "}
            <span className="text-gray-300 text-sm">
              {dayjs(user.createdAt).format("MMMM D, YYYY hh:mm A")}
            </span>
          </p>

          <button onClick={handleMyOrders} className="text-sm bg-white/15 w-fit px-4 py-2 rounded-md mt-4 cursor-pointer hover:opacity-70 duration-300 transition-colors">Click here to view orders</button>

          <div className="flex flex-col gap-2 w-full mt-8">
            {/* Name */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Your name</p>
              {editMode ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                  type="text"
                />
              ) : (
                <p className="w-full rounded p-2 border text-sm mt-1">{user.name}</p>
              )}
            </div>

            {/* Username */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Your username</p>
              <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                {user.username}
              </p>
            </div>

            {/* Email */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Your email</p>
              <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                {user.email}
              </p>
            </div>

            {/* Phone */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Your phone</p>
              {editMode ? (
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                  type="text"
                />
              ) : (
                <p className="w-full rounded p-2 border text-sm mt-1">{user.phone}</p>
              )}
            </div>

            {/* Address Line */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Delivery Address</p>
              {editMode ? (
                <input
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                  type="text"
                />
              ) : (
                <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                  {user.address?.addressLine}
                </p>
              )}
            </div>

            {/* City and Postal Code */}
            <div className="w-full flex items-center gap-2">
              <div className="w-full">
                <p className="font-medium text-slate-200">City</p>
                {editMode ? (
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                    type="text"
                  />
                ) : (
                  <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                    {user.address?.city}
                  </p>
                )}
              </div>

              <div className="w-full">
                <p className="font-medium text-slate-200">Postal Code</p>
                {editMode ? (
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                    type="text"
                  />
                ) : (
                  <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                    {user.address?.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="w-full">
              <p className="font-medium text-slate-200">Country</p>
              {editMode ? (
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded p-2 border mt-1 border-slate-100 bg-gray-500 text-white"
                  type="text"
                />
              ) : (
                <p className="mt-1 w-full text-slate-300 rounded p-2 border text-sm">
                  {user.address?.country}
                </p>
              )}
            </div>

            {/* Edit or Save Button */}
            {editMode ? (
              <button
                onClick={handleSave}
                className="border rounded-[12px] bg-white text-blue-950 font-medium mt-2 hover:opacity-80 duration-300 transition-all cursor-pointer text-sm py-2"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="border mt-2 rounded-[12px] bg-white text-blue-950 font-medium hover:opacity-80 duration-300 transition-all cursor-pointer text-sm py-2"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
