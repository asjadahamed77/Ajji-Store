import React from "react";
import logo from "../assets/logo/AjjiStore.png";
import { Link } from "react-router-dom";

const Footer = () => {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Mobiles', path: '/products/mobile' },
        { name: 'MacBooks', path: '/products/macbook' },
        { name: 'Laptops', path: 'products/laptop' },
        { name: 'iPads', path: 'products/ipad' },
        { name: 'tablets', path: 'products/tablet' },
        { name: 'AirPods', path: 'products/airpod' },
        { name: 'Watches', path: 'products/watch' },
        { name: 'Accessories', path: 'products/accessory' },
      ];

  return (
 <div>
       <div className="grid xl:grid-cols-[1fr_2fr_1fr] mt-8 md:grid-cols-2 gap-16 lg:gap-24  py-8 lg:px-24 px-4 border-t border-blue-400/10">
      {/* Footer Left */}
      <div>
        <img src={logo} alt="ajji-store" className="w-32" />
        <p className="text-xs w-[75%] sm:w-full  mt-2 text-blue-200">
          AjjiStore is your one-stop destination for the latest smartphones,
          tablets, laptops, MacBooks, accessories, and more. Whether you're
          upgrading your device or looking for high-quality tech gear, we bring
          you a curated selection of top brands at unbeatable prices. With a
          sleek, user-friendly design, secure checkout, and fast delivery,
          shopping with AjjiStore is as smart as the devices we sell.
        </p>
      </div>
      <div>
        <h1 className="text-lg uppercase font-semibold">QUICK LINKS</h1>
        <div className="grid grid-cols-2  space-x-24 space-y-4 mt-4">
    {
        navLinks.map((item, index)=>(
            <Link onClick={()=> scrollTo(0,0)} key={index} to={item.path} className="text-sm uppercase hover:opacity-75 duration-300 text-blue-200 ">
            {item.name}
            </Link>
        ))
    }
        </div>
      </div>
      <div>
      <h1 className="text-lg uppercase font-semibold">Subscribe us</h1>
      <div>
        <p className="text-sm text-blue-200 mt-2">
          Subscribe to our newsletter for the latest updates and offers.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-blue-300/20 bg-transparent px-4 py-2 rounded-lg text-blue-200 focus:outline-none focus:border-blue-500"
          />
          <button   className="text-sm bg-white rounded py-2 px-4 text-blue-950 font-medium duration-300 
             'opacity-60 hover:opacity-80 cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
      </div>

    </div>
    <div className="border-t flex flex-col lg:flex-row gap-2  p-2 md:text-sm text-xs justify-between px-8 text-center items-center   w-full border-blue-300/10 ">
<p>© 2025 AjjiStore. All rights reserved.</p>
<p>Your trusted tech partner for phones, laptops, tablets, and accessories.</p>
<p>Secure Payments | Fast Delivery | Genuine Products</p>
   </div>
 </div>
  );
};

export default Footer;
