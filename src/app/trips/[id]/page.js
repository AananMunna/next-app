import { ObjectId } from "mongodb";
import { getTripsCollection } from "@/lib/db";


export default async function TripDetailsPage({ params }) {
  const { id } = params;
  const tripsCollection = await getTripsCollection();

  const trip = await tripsCollection.findOne({ _id: new ObjectId(id) });

  if (!trip) {
    return <p>Trip not found!</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{trip.title}</h1>
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-64 object-cover rounded mb-6"
        loading="lazy"
      />
      <p className="mb-4">{trip.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
      <ul className="list-disc list-inside mb-6">
        {trip.itinerary.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Inclusions</h2>
      <ul className="list-disc list-inside mb-6">
        {trip.inclusions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Exclusions</h2>
      <ul className="list-disc list-inside mb-6">
        {trip.exclusions.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="font-semibold">
        Duration: <span className="font-normal">{trip.duration}</span>
      </p>
      <p className="font-semibold">
        Price: <span className="font-normal">${trip.price}</span>
      </p>
      <p className="font-semibold">
        Contact: <span className="font-normal">{trip.contactEmail}</span>
      </p>
    </main>
  );
}
