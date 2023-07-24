/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Heading = ({ title }) => {
  return (
    <p className="headP">
      <Link to="/dashboard" className="mr-2 text-[#000]">
        <span>Dashboard</span>
      </Link>
      / {title}
    </p>
  );
};

export default Heading;
