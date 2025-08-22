"use client";

import { useForm, useFieldArray } from "react-hook-form";

export default function AddProductPage() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      releaseDate: "",
      sku: "",
      price: 0,
      discountPrice: 0,
      currency: "USD",
      category: "Smartphones",
      overview: "",
      technicalSpecs: {
        processor: "",
        ram: "",
        storage: [""],
        battery: "",
        display: {
          size: "",
          type: "",
          resolution: "",
          protection: "",
          peakBrightness: "",
        },
        rearCameras: [{ type: "", mp: 0, features: [""], opticalZoom: "" }],
        frontCamera: { mp: 0, features: [""] },
        video: { rear: "", front: "" },
        connectivity: {
          "5G": false,
          bluetooth: "",
          wifi: [""],
          nfc: false,
          gps: [""],
          usb: "",
          uwb: false,
          audioJack: false,
        },
        sensors: [""],
        os: "",
        dimensions: { height: "", width: "", depth: "" },
        weight: "",
        colorOptions: [""],
        ipRating: "",
      },
      images: [""],
      descriptionSections: {
        design: "",
        cameraPerformance: "",
        batteryLife: "",
        gaming: "",
        audio: "",
      },
      rating: 0,
      reviews: [{ user: "", rating: 0, date: "", comment: "" }],
      stock: 0,
      warranty: "",
      features: [""],
      availableAt: [""],
    },
  });

  // dynamic arrays
  const { fields: storageFields, append: addStorage } = useFieldArray({
    control,
    name: "technicalSpecs.storage",
  });

  const { fields: imageFields, append: addImage } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: featureFields, append: addFeature } = useFieldArray({
    control,
    name: "features",
  });

  const { fields: shopFields, append: addShop } = useFieldArray({
    control,
    name: "availableAt",
  });

  const { fields: colorFields, append: addColor } = useFieldArray({
    control,
    name: "technicalSpecs.colorOptions",
  });

  const { fields: sensorFields, append: addSensor } = useFieldArray({
    control,
    name: "technicalSpecs.sensors",
  });

  const { fields: reviewFields, append: addReview } = useFieldArray({
    control,
    name: "reviews",
  });

  const onSubmit = async (data) => {
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("✅ Product Added!");
    } else {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Info */}
        <input {...register("title")} placeholder="Title" className="w-full p-2 border rounded" />
        <input {...register("brand")} placeholder="Brand" className="w-full p-2 border rounded" />
        <input {...register("model")} placeholder="Model" className="w-full p-2 border rounded" />
        <input {...register("releaseDate")} type="date" className="w-full p-2 border rounded" />
        <input {...register("sku")} placeholder="SKU" className="w-full p-2 border rounded" />
        <input {...register("price")} type="number" placeholder="Price" className="w-full p-2 border rounded" />
        <input {...register("discountPrice")} type="number" placeholder="Discount Price" className="w-full p-2 border rounded" />
        <textarea {...register("overview")} placeholder="Overview" className="w-full p-2 border rounded" />

        {/* Dynamic Storage */}
        <h2 className="font-semibold">Storage Options</h2>
        {storageFields.map((field, index) => (
          <input key={field.id} {...register(`technicalSpecs.storage.${index}`)} placeholder="Storage" className="w-full p-2 border rounded" />
        ))}
        <button type="button" onClick={() => addStorage("")} className="bg-gray-200 px-2 py-1 rounded">+ Add Storage</button>

        {/* Dynamic Images */}
        <h2 className="font-semibold">Images</h2>
        {imageFields.map((field, index) => (
          <input key={field.id} {...register(`images.${index}`)} placeholder="Image URL" className="w-full p-2 border rounded" />
        ))}
        <button type="button" onClick={() => addImage("")} className="bg-gray-200 px-2 py-1 rounded">+ Add Image</button>

        {/* Sensors */}
        <h2 className="font-semibold">Sensors</h2>
        {sensorFields.map((field, index) => (
          <input key={field.id} {...register(`technicalSpecs.sensors.${index}`)} placeholder="Sensor" className="w-full p-2 border rounded" />
        ))}
        <button type="button" onClick={() => addSensor("")} className="bg-gray-200 px-2 py-1 rounded">+ Add Sensor</button>

        {/* Colors */}
        <h2 className="font-semibold">Color Options</h2>
        {colorFields.map((field, index) => (
          <input key={field.id} {...register(`technicalSpecs.colorOptions.${index}`)} placeholder="Color" className="w-full p-2 border rounded" />
        ))}
        <button type="button" onClick={() => addColor("")} className="bg-gray-200 px-2 py-1 rounded">+ Add Color</button>

        {/* Reviews */}
        <h2 className="font-semibold">Reviews</h2>
        {reviewFields.map((field, index) => (
          <div key={field.id} className="space-y-2 border p-2 rounded">
            <input {...register(`reviews.${index}.user`)} placeholder="Reviewer Name" className="w-full p-2 border rounded" />
            <input {...register(`reviews.${index}.rating`)} type="number" placeholder="Rating" className="w-full p-2 border rounded" />
            <input {...register(`reviews.${index}.date`)} type="date" className="w-full p-2 border rounded" />
            <textarea {...register(`reviews.${index}.comment`)} placeholder="Comment" className="w-full p-2 border rounded" />
          </div>
        ))}
        <button type="button" onClick={() => addReview({ user: "", rating: 0, date: "", comment: "" })} className="bg-gray-200 px-2 py-1 rounded">+ Add Review</button>

        {/* Final */}
        <input {...register("stock")} type="number" placeholder="Stock" className="w-full p-2 border rounded" />
        <input {...register("warranty")} placeholder="Warranty" className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
