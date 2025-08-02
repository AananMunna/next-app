import clientPromise from "./mongodb"; // your existing MongoDB client connection

export async function getDb() {
  const client = await clientPromise;
  return client.db("next-test");
}

export async function getTripsCollection() {
  const db = await getDb();
  return db.collection("phonesCollection");
}
export async function getUsersCollection() {
  const db = await getDb();
  return db.collection("users");
}

// You can add more collections or helpers here later!
