import React from "react";
import { ClockLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" flex items-center justify-center  my-50">
      <ClockLoader color="#a7d6d1" size={120} />
    </div>
  );
};

export default Loader;
