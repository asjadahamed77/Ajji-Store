import React, { useState } from "react";
import { CiMobile3 } from "react-icons/ci";
import { TbDeviceAirpods, TbDeviceMobileSearch } from "react-icons/tb";
import { RiMacbookFill } from "react-icons/ri";
import { BsFillLaptopFill } from "react-icons/bs";
import { IoMdTabletPortrait } from "react-icons/io";
import { MdOutlineTabletMac } from "react-icons/md";
import { IoWatch, IoImagesSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const variantCategories = ["mobile", "laptop", "macbook", "ipad", "tablet", "watch"];

const AddProduct = () => {
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [variants, setVariants] = useState([{ storage: "", color: "", price: "", stock: "" }]);
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);

  const categoryHandler = (label) => {
    setSelectedCategory(label.toLowerCase());
    setShowCategories(false);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = [...images, ...selectedFiles].slice(0, 6);
    setImages(totalFiles);
    const imagePreviews = totalFiles.map((file) => URL.createObjectURL(file));
    setPreviews(imagePreviews);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { storage: "", color: "", price: "", stock: "" }]);
  };

  const removeVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !brand || !description || images.length === 0) {
      return toast.error("Please fill all required fields.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", selectedCategory);
    formData.append("description", description);

    if (!variantCategories.includes(selectedCategory)) {
      if (!price || !stock) return toast.error("Enter price and stock.");
      formData.append("price", price);
      formData.append("stock", stock);
    }

    if (variantCategories.includes(selectedCategory)) {
      formData.append("variants", JSON.stringify(variants));
    }

    formData.append("specifications", JSON.stringify(specifications));

    images.forEach((img) => {
      formData.append("images", img);
    });

    toast.success("Form submitted successfully (Mocked)");
    // Submit logic here (e.g., axios.post)
  };

  return (
    <form onSubmit={handleSubmit}>
      {showCategories ? (
        <div className="w-full h-[93vh] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-stretch xl:p-12 p-8 xl:gap-8 gap-4 overflow-y-scroll">
          {[
            { icon: <CiMobile3 />, label: "Mobile" },
            { icon: <RiMacbookFill />, label: "Macbook" },
            { icon: <BsFillLaptopFill />, label: "Laptop" },
            { icon: <MdOutlineTabletMac />, label: "iPad" },
            { icon: <IoMdTabletPortrait />, label: "Tablet" },
            { icon: <TbDeviceAirpods />, label: "Airpod" },
            { icon: <IoWatch />, label: "Watch" },
            { icon: <TbDeviceMobileSearch />, label: "Accessory" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => categoryHandler(item.label)}
              className="flex items-center justify-center text-blue-200 p-4 px-12 cursor-pointer rounded-xl hover:bg-white hover:text-blue-950 duration-300 transition-all gap-4 border border-blue-200"
            >
              <span className="text-4xl">{item.icon}</span>
              <p className="uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[93vh] flex flex-col gap-4 md:px-8 px-4 py-8 overflow-y-scroll">
          <div className="w-full">
            <p className="font-semibold">Name <span className="text-slate-500">*</span></p>
            <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="w-full">
            <p className="font-semibold">Brand <span className="text-slate-500">*</span></p>
            <select className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Select Brand</option>
              {["Ambrane", "Anker", "Apple", "Asus", "Belkin", "boAt",
                "Boult Audio", "ESR", "Fire-Boltt", "Generic", "Google Pixel",
                "Infinix", "iQOO", "JBL", "Lenovo", "Mi", "Motorola", "Noise",
                "Nokia", "OnePlus", "OPPO", "Portronics", "Realme", "Ringke",
                "Samsung", "Sony", "Sony Xperia", "Spigen", "Tecno", "vivo",
                "Xiaomi"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <p className="font-semibold">Description <span className="text-slate-500">*</span></p>
            <textarea className="p-2 resize-none h-20 overflow-y-scroll bg-transparent w-full mt-1 border border-blue-200 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="w-full">
            <p className="font-semibold">Upload Images <span className="text-slate-500">*</span></p>
            <div className="flex items-center gap-4 mt-1 flex-wrap">
              <label htmlFor="imageUpload" className="cursor-pointer text-blue-200 text-6xl">
                <IoImagesSharp />
              </label>
              <input type="file" id="imageUpload" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
              {previews.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover rounded border border-blue-200" />
                  <button type="button" className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs" onClick={() => removeImage(index)}>
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm mt-1 text-slate-500">{images.length}/6 images selected</p>
          </div>

          {/* Show variants or price/stock */}
          {variantCategories.includes(selectedCategory) ? (
            <div className="w-full">
              <p className="font-semibold">Variants</p>
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 mt-2">
                  <input placeholder="Storage" className="p-2 border rounded bg-transparent border-blue-200" value={v.storage} onChange={(e) => handleVariantChange(i, "storage", e.target.value)} />
                  <input placeholder="Color" className="p-2 border rounded bg-transparent border-blue-200" value={v.color} onChange={(e) => handleVariantChange(i, "color", e.target.value)} />
                  <input type="number" placeholder="Price" className="p-2 border rounded bg-transparent border-blue-200" value={v.price} onChange={(e) => handleVariantChange(i, "price", e.target.value)} />
                  <input type="number" placeholder="Stock" className="p-2 border rounded bg-transparent border-blue-200" value={v.stock} onChange={(e) => handleVariantChange(i, "stock", e.target.value)} />
                  {i > 0 && <button type="button" onClick={() => removeVariant(i)} className="text-red-500 text-sm">Remove</button>}
                </div>
              ))}
              <button type="button" onClick={addVariant} className="text-blue-200 mt-2">+ Add Variant</button>
            </div>
          ) : (
            <>
              <div className="w-full">
                <p className="font-semibold">Price <span className="text-slate-500">*</span></p>
                <input type="number" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="w-full">
                <p className="font-semibold">Stock <span className="text-slate-500">*</span></p>
                <input type="number" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>
            </>
          )}

          {/* Specifications */}
          <div className="w-full">
            <p className="font-semibold">Specifications</p>
            {specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input placeholder="Key" className="p-2 border rounded bg-transparent border-blue-200 w-1/2" value={spec.key} onChange={(e) => handleSpecChange(i, "key", e.target.value)} />
                <input placeholder="Value" className="p-2 border rounded bg-transparent border-blue-200 w-1/2" value={spec.value} onChange={(e) => handleSpecChange(i, "value", e.target.value)} />
                {i > 0 && <button type="button" onClick={() => removeSpecification(i)} className="text-red-500 text-sm">Remove</button>}
              </div>
            ))}
            <button type="button" onClick={addSpecification} className="text-blue-200 mt-2">+ Add Specification</button>
          </div>

          <button type="submit" className="bg-white text-blue-950 px-4 py-2 mt-4 w-full rounded font-semibold  hover:opacity-80 transition-all">Submit</button>
        </div>
      )}
    </form>
  );
};

export default AddProduct;
