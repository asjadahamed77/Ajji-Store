import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    emailjs
      .sendForm(
        "service_8omlorf", 
        "template_2u4vneb", 
        form.current,
        "Sc7cUcLnAlRpr-N8L" 
      )
      .then(
        () => {
          setSuccess(true);
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Email send failed:", error.text);
          toast.error("Failed to send message. Please try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-12 py-12 bg-white/5 rounded-xl sm:mx-12 my-24 ">
      <h1 className="md:text-4xl text-2xl font-arvo font-semibold text-center">
        Contact Ajji-Store - Trusted Mobile Phone Shop
      </h1>
     <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-20 min-w-full">
      <div className="flex flex-col mt-12  w-full flex-1">
        <p className="font-semibold tracking-wide">We are here to help</p>
       <h1 className="text-4xl font-bold mt-4">Need assistance?</h1>
       <p className="mt-4 tracking-wide text-sm text-slate-200">For general inquiries or questions regarding sales or press, please leave your contact information below and we will get back to you as soon as possible.</p>
       <p className="font-semibold text-xl mt-8">SHOW ROOMS</p>
       <div className="grid sm:grid-cols-2 gap-4 mt-4">
<div className="p-4 shadow  rounded-xl ">
  <p className="text-lg font-bold">Ajji-Store DT</p>
  <p className="text-white/90 mt-2">103/4, Mathugama Road,</p>
  <p className="text-white/90 mt-2">Dharga Town</p>
  <p className="text-white/90 mt-2">+94 76 125 7788</p>
  <a href="https://maps.app.goo.gl/aVzd7ooi3dnje6qR7" target="_blank" className="flex items-center mt-4 w-fit border rounded-full px-8 py-2 bg-white text-blue-950 hover:opacity-70 duration-300 transition-opacity">
    <span>
      <FaMapMarkerAlt className="mr-4" />
    </span>
    <p className="text-sm ">Find Us</p>
  </a>
</div>
<div className="p-4 shadow  rounded-xl">
  <p className="text-lg font-bold">Ajji-Store </p>
  <p className="text-white/90 mt-2">103/4, Colombo Road,</p>
  <p className="text-white/90 mt-2">Aluthgama</p>
  <p className="text-white/90 mt-2">+94 76 125 7788</p>
  <a href="https://maps.app.goo.gl/aVzd7ooi3dnje6qR7" target="_blank" className="flex items-center mt-4 w-fit border rounded-full px-8 py-2 bg-white text-blue-950 hover:opacity-70 duration-300 transition-opacity">
    <span>
      <FaMapMarkerAlt className="mr-4" />
    </span>
    <p className="text-sm ">Find Us</p>
  </a>
</div>
       </div>
        </div>
        <form
        ref={form}
        onSubmit={submitHandler}
        className="flex flex-col mt-12 gap-8 w-full flex-1 bg-white/10 rounded-3xl sm:p-8 p-4"
      >
        <div className="flex flex-col sm:flex-row gap-8 items-center min-w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-4 flex-1 w-full border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/60"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-4 flex-1 w-full border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/60"
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="p-4 flex-1 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/60"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="p-4 flex-1 border border-white/20 rounded-xl min-h-28 bg-white/10 text-white placeholder-white/60 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className={`p-4 bg-white font-semibold tracking-wide rounded-xl cursor-pointer hover:opacity-80 transition-opacity duration-300 text-blue-950 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "SEND MESSAGE"}
        </button>
        {success && (
          <p className="text-green-500 mt-2 text-sm">Message sent successfully!</p>
        )}
      </form>
     
     </div>
    </div>
  );
};

export default Contact;
