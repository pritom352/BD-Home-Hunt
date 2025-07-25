import React from "react";
import Banner from "../../Components/Banner";
import { useLoaderData } from "react-router";
import AdvertisementSection from "../../Components/AdvertisementSection";
import LatestReviews from "../../Components/LatestReviews";
import TopAgent from "../../Components/TopAgent";

const Home = () => {
  const properties = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <AdvertisementSection properties={properties}></AdvertisementSection>
      <TopAgent></TopAgent>

      <LatestReviews></LatestReviews>
    </div>
  );
};

export default Home;
