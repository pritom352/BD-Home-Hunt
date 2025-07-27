import React from "react";
import { useLoaderData } from "react-router";
import PropertyCard from "./PropertyCard";

const AdvertisementSection = () => {
  const properties = useLoaderData();

  // console.log("AdvertisementSection render");

  return (
    <div className="container mx-auto  mt-25">
      <h1 className="text-4xl text-center mb-15 font-bold text-gray-800 ">
        Find Your Dream Home
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;
