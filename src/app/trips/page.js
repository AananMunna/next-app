import { getTripsCollection } from "@/lib/db";
import Link from "next/link";  // Import Link


export default async function TripsPage() {
  const tripsCollection = await getTripsCollection();
  const trips = await tripsCollection.find({}).sort({ date: 1 }).toArray();

  // Convert _id ObjectId to string for JSON serialization
  const tripsData = trips.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Upcoming Trips
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tripsData.map(({ id, title, location, date, image, description }) => (
  <div
    key={id}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
      loading="lazy"
    />
    <div className="p-5">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-3 text-gray-600 text-sm">{description}</p>

      {/* Add Details button */}
      <Link
        href={`/trips/${id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Details
      </Link>
    </div>
  </div>
))}
      </div>
    </main>
  );
}
