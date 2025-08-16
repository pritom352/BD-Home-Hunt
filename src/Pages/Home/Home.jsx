import React from "react";
import Banner from "../../Components/Banner";
import { useLoaderData } from "react-router";
import AdvertisementSection from "../../Components/AdvertisementSection";
import LatestReviews from "../../Components/LatestReviews";
import TopAgent from "../../Components/TopAgent";
import HowItWorks from "../../Components/HowItWorks";
import WhyChooseUs from "../../Components/WhyChooseUs";

const Home = () => {
  const properties = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <AdvertisementSection properties={properties}></AdvertisementSection>
      <TopAgent></TopAgent>
      {/* <HowItWorks></HowItWorks> */}
      <WhyChooseUs></WhyChooseUs>
      <LatestReviews></LatestReviews>
    </div>
  );
};

export default Home;
