import React, { useEffect, useState } from "react";
import { IoImagesSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getSingleProduct } from "../redux/slices/adminSlice";

const variantCategories = ["mobile", "laptop", "macbook", "ipad", "tablet", "watch"];

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleProduct, loading } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [variants, setVariants] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct) {
      setName(singleProduct.name || "");
      setBrand(singleProduct.brand || "");
      setDescription(singleProduct.description || "");
      setCategory(singleProduct.category || "");
      setImages([]);
      setExistingImages(singleProduct.images || []);
      setPreviews(singleProduct.images?.filter(img => img.url).map(img => img.url) || []);
      setPrice(singleProduct.price || "");
      setStock(singleProduct.stock || "");
      setVariants(singleProduct.variants?.length ? singleProduct.variants : [{ storage: "", color: "", price: "", stock: "" }]);
      setSpecifications(singleProduct.specifications?.length ? singleProduct.specifications : [{ key: "", value: "" }]);
    }
  }, [singleProduct]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previews.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }
    setImages(files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
      setPreviews(previews.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setImages(images.filter((_, i) => i !== newIndex));
      setPreviews(previews.filter((_, i) => i !== index));
    }
  };

  const handleVariantChange = (index, field, value) => {
    console.log("Updating variant:", { index, field, value });
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    console.log("Updated variants:", updatedVariants);
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    if (variants.length >= 6) {
      toast.error("Maximum 6 variants allowed");
      return;
    }
    setVariants([
      ...variants,
      { storage: "", color: "", price: "", stock: "" }
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleSpecChange = (i, field, value) => {
    const updated = [...specifications];
    updated[i][field] = value;
    setSpecifications(updated);
  };

  const addSpecification = () => setSpecifications([...specifications, { key: "", value: "" }]);
  const removeSpecification = (i) => setSpecifications(specifications.filter((_, index) => index !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !brand || !description || !category) return toast.error("Fill all required fields.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category", category);

    if (!variantCategories.includes(category)) {
      if (!price || !stock) {
        return toast.error("Enter price and stock.");
      }
      formData.append("price", price);
      formData.append("stock", stock);
    } else {
      if (variants.length === 0 || !variants[0].storage || !variants[0].price || !variants[0].stock) {
        return toast.error("Fill all variant fields.");
      }
      console.log("Sending variants:", variants);
      const validVariants = variants.map(variant => ({
        storage: variant.storage || "",
        color: variant.color || "",
        price: variant.price || 0,
        stock: variant.stock || 0
      }));
      formData.append("variants", JSON.stringify(validVariants));
    }

    formData.append("specifications", JSON.stringify(specifications));
    formData.append("existingImages", JSON.stringify(existingImages));
    images.forEach((img) => formData.append("images", img));

    try {
      
      
      await dispatch(updateProduct({ productId: id, formData }));
      navigate("/view-product");
    } catch {
      toast.error("Update failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-[93vh] flex flex-col gap-4 md:px-8 px-4 py-8 overflow-y-scroll">
      <div className="w-full">
        <p className="font-semibold">Name <span className="text-slate-500">*</span></p>
        <input type="text" className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="w-full">
        <p className="font-semibold">Brand <span className="text-slate-500">*</span></p>
        <select className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Select Brand</option>
          {["Ambrane", "Anker", "Apple", "Asus", "Belkin", "boAt", "Boult Audio", "ESR", "Fire-Boltt", "Generic", "Google Pixel", "Infinix", "iQOO", "JBL", "Lenovo", "Mi", "Motorola", "Noise", "Nokia", "OnePlus", "OPPO", "Portronics", "Realme", "Ringke", "Samsung", "Sony", "Sony Xperia", "Spigen", "Tecno", "vivo", "Xiaomi"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <p className="font-semibold">Description <span className="text-slate-500">*</span></p>
        <textarea className="p-2 resize-none h-20 bg-transparent w-full mt-1 border border-blue-200 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="w-full">
        <p className="font-semibold">Category <span className="text-slate-500">*</span></p>
        <select className="p-2 bg-transparent w-full mt-1 border border-blue-200 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {["mobile", "laptop", "macbook", "ipad", "tablet", "watch", "accessories", "other"].map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
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
        <p className="text-sm mt-1 text-slate-500">{images.length}/6 new images selected</p>
      </div>

      {variantCategories.includes(category) ? (
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

      <button type="submit" className="bg-white text-blue-950 px-4 py-2 mt-4 w-full rounded font-semibold hover:opacity-80 transition-all">
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
};

export default EditProduct;
