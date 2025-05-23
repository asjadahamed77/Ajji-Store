import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../redux/slices/adminUsers";

const AllUsers = () => {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <div className="animate-spin rounded-full h-12 w-12 mt-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-blue-300">Loading Users...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen  py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[93vh] flex flex-col gap-4 md:px-8 px-4 py-8 overflow-y-scroll">
      <h1 className="w-fit text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-8">
        All Users
      </h1>
      <div className="grid lg:grid-cols-2 gap-4 ">
        {users.map((user, index) => (
          <div key={index} className="p-4 bg-white/10 text-blue-300 rounded-xl space-y-2">
            <p className="text-sm md:text-base font-semibold">
              Name: <span className="font-medium">{user.name}</span>
            </p>
            <p className="text-sm md:text-base font-semibold">
              Username: <span className="font-medium">{user.username}</span>
            </p>
            <p className="text-sm md:text-base font-semibold">
              Email: <span className="font-medium">{user.email}</span>
            </p>
            <div>
                {
                    user.address && (
                       <>
                        <p className="text-sm md:text-base font-bold underline">Address</p>
                        <p className="text-sm  font-semibold">Street: <span className="font-medium">{user.address.addressLine}</span></p>
                        <p className="text-sm  font-semibold">City: <span className="font-medium">{user.address.city}</span></p>
                        <p className="text-sm  font-semibold">Postal Code: <span className="font-medium">{user.address.postalCode}</span></p>
                        <p className="text-sm  font-semibold">Country: <span className="font-medium">{user.address.country}</span></p>
                       </>
                    )
                }
            </div>
            <div className="flex w-fit gap-6 mt-6">
            <a href={`mailto:${user.email}`}>
  <button className="px-12 py-2 bg-white text-blue-950 font-medium text-sm cursor-pointer hover:opacity-55 duration-300 transition-opacity rounded-lg">
    Send Email
  </button>
</a>
                <button onClick={() => handleDeleteUser(user._id)}  className="px-12 py-2 bg-white text-red-500 font-medium text-sm cursor-pointer hover:opacity-55 duration-300 transition-opacity rounded-lg">Delete User</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
