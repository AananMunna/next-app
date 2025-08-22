import { getProductsCollection } from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to sanitize product data
function sanitizeProductData(data) {
  return {
    title: data.title || "",
    brand: data.brand || "",
    model: data.model || "",
    releaseDate: data.releaseDate || "",
    sku: data.sku || "",
    price: Number(data.price) || 0,
    discountPrice: Number(data.discountPrice) || 0,
    currency: data.currency || "USD",
    category: data.category || "Smartphones",
    overview: data.overview || "",
    technicalSpecs: {
      processor: data.technicalSpecs?.processor || "",
      ram: data.technicalSpecs?.ram || "",
      storage: Array.isArray(data.technicalSpecs?.storage) ? data.technicalSpecs.storage : [""],
      battery: data.technicalSpecs?.battery || "",
      display: {
        size: data.technicalSpecs?.display?.size || "",
        type: data.technicalSpecs?.display?.type || "",
        resolution: data.technicalSpecs?.display?.resolution || "",
        protection: data.technicalSpecs?.display?.protection || "",
        peakBrightness: data.technicalSpecs?.display?.peakBrightness || "",
      },
      rearCameras: Array.isArray(data.technicalSpecs?.rearCameras)
        ? data.technicalSpecs.rearCameras.map(cam => ({
            type: cam.type || "",
            mp: Number(cam.mp) || 0,
            opticalZoom: cam.opticalZoom || "",
            features: Array.isArray(cam.features) ? cam.features : [""],
          }))
        : [],
      frontCamera: {
        mp: Number(data.technicalSpecs?.frontCamera?.mp) || 0,
        features: Array.isArray(data.technicalSpecs?.frontCamera?.features) ? data.technicalSpecs.frontCamera.features : [""],
      },
      connectivity: {
        "5G": Boolean(data.technicalSpecs?.connectivity?.["5G"]),
        bluetooth: data.technicalSpecs?.connectivity?.bluetooth || "",
        wifi: Array.isArray(data.technicalSpecs?.connectivity?.wifi) ? data.technicalSpecs.connectivity.wifi : [""],
        nfc: Boolean(data.technicalSpecs?.connectivity?.nfc),
        usb: data.technicalSpecs?.connectivity?.usb || "",
      },
      os: data.technicalSpecs?.os || "",
      dimensions: {
        height: data.technicalSpecs?.dimensions?.height || "",
        width: data.technicalSpecs?.dimensions?.width || "",
        depth: data.technicalSpecs?.dimensions?.depth || "",
      },
      weight: data.technicalSpecs?.weight || "",
      colorOptions: Array.isArray(data.technicalSpecs?.colorOptions) ? data.technicalSpecs.colorOptions : [""],
      ipRating: data.technicalSpecs?.ipRating || "",
      sensors: Array.isArray(data.technicalSpecs?.sensors) ? data.technicalSpecs.sensors : [""],
    },
    images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/placeholder.png"],
    descriptionSections: {
      design: data.descriptionSections?.design || "",
      cameraPerformance: data.descriptionSections?.cameraPerformance || "",
      batteryLife: data.descriptionSections?.batteryLife || "",
      gaming: data.descriptionSections?.gaming || "",
      audio: data.descriptionSections?.audio || "",
    },
    rating: Number(data.rating) || 0,
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map(r => ({
          user: r.user || "Anonymous",
          rating: Number(r.rating) || 0,
          date: r.date || null,
          comment: r.comment || "",
        }))
      : [],
    stock: Number(data.stock) || 0,
    warranty: data.warranty || "",
    features: Array.isArray(data.features) ? data.features : [""],
    availableAt: Array.isArray(data.availableAt) ? data.availableAt : [""],
  };
}

export async function POST(req) {
  const productCollection = await getProductsCollection();

  try {
    const body = await req.json();

    // Sanitize the incoming data
    const sanitizedProduct = sanitizeProductData(body);

    const result = await productCollection.insertOne(sanitizedProduct);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to insert product" }, { status: 500 });
  }
}
