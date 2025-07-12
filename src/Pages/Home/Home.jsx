import React from "react";
import Banner from "../../Components/Banner";
import { useLoaderData } from "react-router";
import AdvertisementSection from "../../Components/AdvertisementSection";

const Home = () => {
  const properties = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <AdvertisementSection properties={properties}></AdvertisementSection>
    </div>
  );
};

export default Home;
