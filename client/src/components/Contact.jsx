import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

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
    <div className="flex flex-col justify-center items-center px-4 py-6 bg-white/5 rounded-xl sm:mx-12">
      <h1 className="md:text-4xl text-2xl font-arvo font-semibold text-center">
        Contact Ajji-Store - Trusted Mobile Phone Shop
      </h1>
      <form
        ref={form}
        onSubmit={submitHandler}
        className="flex flex-col mt-12 gap-8 w-full sm:w-[500px] md:w-[700px]"
      >
        <div className="flex flex-col sm:flex-row gap-8 items-center min-w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-4 flex-1 w-full border border-white/20 rounded-md bg-white/10 text-white placeholder-white/60"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-4 flex-1 w-full border border-white/20 rounded-md bg-white/10 text-white placeholder-white/60"
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="p-4 flex-1 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/60"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="p-4 flex-1 border border-white/20 rounded-md min-h-28 bg-white/10 text-white placeholder-white/60 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className={`p-4 bg-white font-semibold tracking-wide rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-300 text-blue-950 ${
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
  );
};

export default Contact;
