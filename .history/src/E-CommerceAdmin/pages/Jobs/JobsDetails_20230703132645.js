/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const JobsDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const FetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://gadi-driver-u8ym.vercel.app/api/v1/jobServices/${id}`
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  function DataHandler(name, string) {
    return name ? (
      <Form.Group className="mb-3">
        <Form.Label> {string}</Form.Label>
        <Form.Control type="text" disabled placeholder={name} />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP"> Dashboard / Jobs / {data?.jobtitle} </p>

        <Container>
          {DataHandler(data?.userId?.name, "Employer Name")}
          {DataHandler(data?.userId?.email, "Employer Email")}
          {DataHandler(data?.userId?.phone, "Employer Phone Number")}
          {DataHandler(data?.userId?.companyType, "Employer Company Type")}
          {DataHandler(data?.userId?.details, "Employer Details")}
          {DataHandler(data?.jobtitle, "Job Title")}
          {DataHandler(data?.jobtype, "Job Type")}
          {DataHandler(data?.vehicletype, "Vehicle Type")}
          {DataHandler(data?.vehicletype, "Vehicle Type")}
        </Container>
      </section>
    </>
  );
};

export default HOC(JobsDetails);
