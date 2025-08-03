import clientPromise from "./mongodb"; // your existing MongoDB client connection

export async function getDb() {
  const client = await clientPromise;
  return client.db("next-test");
}

export async function getProductsCollection() {
  const db = await getDb();
  return db.collection("phonesCollection");
}
export async function getUsersCollection() {
  const db = await getDb();
  return db.collection("users");
}
export async function getCartCollection() {
  const db = await getDb();
  return db.collection("cart");
}

// You can add more collections or helpers here later!
