"use client";

import Image from "next/image";
import { Users, MapPin, Heart } from "lucide-react";

// Dummy Community Data
const communityMembers = [
  {
    id: 1,
    name: "Sophia Khan",
    location: "Bangkok, Thailand",
    avatar:
      "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Globetrotter & food lover 🌏🍜",
  },
  {
    id: 2,
    name: "Daniel Lee",
    location: "Paris, France",
    avatar:
      "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Photographer capturing hidden gems 📸",
  },
  {
    id: 3,
    name: "Aisha Patel",
    location: "Dhaka, Bangladesh",
    avatar:
      "https://randomuser.me/api/portraits/women/50.jpg",
    bio: "Backpacker, culture explorer 🎒",
  },
  {
    id: 4,
    name: "Lucas Silva",
    location: "Rio de Janeiro, Brazil",
    avatar:
      "https://randomuser.me/api/portraits/men/60.jpg",
    bio: "Adventure seeker 🏄",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Our Travel Community
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
          Connect with travelers worldwide, share your stories, and plan adventures together.
        </p>
      </section>

      {/* Community Members */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" /> Meet Our Members
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {communityMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                  {member.location}
                </p>
                <p className="text-gray-600 text-sm mt-3">{member.bio}</p>
                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" /> Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
