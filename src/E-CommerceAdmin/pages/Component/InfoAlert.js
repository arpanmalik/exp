/** @format */

import React from "react";
import { Alert } from "react-bootstrap";

const InfoAlert = ({message}) => {
  return (
   <Alert> {message} </Alert>
  );
};

export default InfoAlert;
