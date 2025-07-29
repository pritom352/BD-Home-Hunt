import React from "react";
import errorimg from "../../assets/Animation - 1749956703540.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  return (
    <div className="border flex h-screen items-center justify-center  ">
      <Lottie className="max-w-[500px]" animationData={errorimg} loop={true} />
    </div>
  );
};

export default ErrorPage;
