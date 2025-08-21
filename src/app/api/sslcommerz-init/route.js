import { NextResponse } from "next/server";
import { getProductsCollection, getOrdersCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function POST(req) {
  const Product = await getProductsCollection();
  const Order = await getOrdersCollection();

  try {
    const { items, user } = await req.json();

    if (!items?.length || !user) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const productIds = items.map(item => new ObjectId(item.productId));

    // প্রোডাক্টগুলো নাও
    const products = await Product.find({ _id: { $in: productIds } }).toArray();

    if (!products.length) {
      return NextResponse.json({ error: "Products not found" }, { status: 404 });
    }

    // Total amount হিসাব + prepare order items details
    let totalAmount = 0;
    const orderItems = items.map(({ productId, quantity }) => {
      const product = products.find(p => p._id.toString() === productId);
      if (!product) throw new Error("Invalid product ID in order");
      const price = product.price || 0;
      totalAmount += price * quantity;
      return {
        productId: product._id,
        title: product.title,
        quantity,
        price,
        subtotal: price * quantity,
      };
    });

    const tran_id = "tran_" + Date.now();

    // Save pending order in DB before payment init
    const orderDoc = {
      tran_id,
      user,
      items: orderItems,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    };

    const insertResult = await Order.insertOne(orderDoc);
    if (!insertResult.insertedId) {
      throw new Error("Failed to create order");
    }

    // Prepare payload for SSLCommerz
    const sslczPayload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASSWORD,
      total_amount: totalAmount.toFixed(2),
      currency: "BDT",
      tran_id,
      success_url: `${process.env.BASE_URL}/payment/success`,
      fail_url: `${process.env.BASE_URL}/payment/fail`,
      cancel_url: `${process.env.BASE_URL}/payment/cancel`,
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: user.address || "Dhaka",
      cus_city: user.city || "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: user.phone,
      shipping_method: "NO",
      product_name: products.map(p => p.title).join(", "),
      product_category: "Mixed",
      product_profile: "general",
    };

    // SSLCommerz API call
    const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      body: new URLSearchParams(sslczPayload),
    });



    const data = await response.json();

    // const url = data?.GatewayPageURL
    // redirect(url)

    if (data?.GatewayPageURL) {
      return NextResponse.json({ url: data.GatewayPageURL });
    } else {
      return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }

  } catch (err) {
    console.error("SSLCommerz Init Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
