import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const questions = [
 
  {
    id: 1,
    question: "How can I contact you?",
    answer: "You can contact us through our contact page! We will be happy to assist you.",
  },
  {
    id: 2,
    question: "How long will it take to get my orders?",
    answer: "It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email.",
  },
  {
    id: 3,
    question: "Do you ship overseas?",
    answer: "Yes, we ship all over the world. Shipping costs will apply, and will be added at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 bg-white/5 lg:px-12 sm:px-8 px-4 rounded-4xl py-8 flex flex-col lg:flex-row gap-12 items-start border border-white/10 lg:mx-20">
      <div className="flex-1">
        <h1 className="text-4xl font-arvo font-bold">FAQ</h1>
        <p className="text-sm sm:text-base mt-8">
          Use this text to share information about your product or shipping policies.
        </p>
        <p className="text-sm sm:text-base mt-2">
          Our customer support is available Monday to Friday: 8am-8:30pm.
        </p>
        <p className="text-sm sm:text-base mt-2 text-white/50">Average answer time: 24h</p>
      </div>

      <div className="flex-1 px-4 p-4 sm:px-8 bg-white/10 rounded-3xl w-full flex flex-col gap-4">
        {questions.map((item, index) => (
          <div key={item.id} className="flex flex-col w-full gap-2 mb-4">
            <div
              onClick={() => toggleAnswer(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <p className="font-semibold tracking-wide">{item.question}</p>
              <span>
                <IoIosArrowDropdownCircle
                  className={`text-xl transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>

            {openIndex === index && (
              <div className="text-sm sm:text-base text-slate-300 mt-2 transition-opacity duration-300 ease-in opacity-100">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
