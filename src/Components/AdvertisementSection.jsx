import React from "react";
import { useLoaderData } from "react-router";
import PropertyCard from "./PropertyCard";

const AdvertisementSection = () => {
  const properties = useLoaderData();

  return (
    <div className="max-w-14/15 md:max-w-10/11 lg:max-w-9/10 mx-auto  mt-25">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-15 font-bold ">
        Find Your Dream Home
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;
