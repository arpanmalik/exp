/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const DriverDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [ role , setRole  ] = useState("") 

  const FetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://gadi-driver-u8ym.vercel.app/api/v1/admin/${id}`);
      setData(data.data);
      setRole(data.data.role)
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    FetchData();
  }, [FetchData]);


  function DataHandler (name , string) {
    return  (
      name ? (
        <Form.Group className="mb-3">
          <Form.Label> { string  }</Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder={name}
          />
        </Form.Group>
      ) : (
        ""
      )
    )
  }


  return (
    <>
    
      {
        role === "EMPLOYER" ? <></> :
      }
        <p className="headP">
          {" "}
          Dashboard / Drivers / {data?.firstName + " " + data?.lastName}{" "}
        </p>

        <Form className="mt-4" style={{ padding: "20px" }}>
          <div className="Thrree">
            <div>
              <img src={data?.frontImage} alt="" />
            </div>
            <div>
              <img src={data?.backImage} alt=""/>
            </div>
            <div>
              <img src={data?.photoUpload} alt="" />
            </div>
          </div>  
          {DataHandler(data?.firstName , "First Name")}
          {DataHandler(data?.lastName , "Last Name")}
          {DataHandler(data?.phone , "Phone Number")}
          {DataHandler(data?.gender , "Gender")}
          {DataHandler(data?.ResumeTitle , "Resume Title")}
          {DataHandler(data?.exactAddress , "Exact Address")}
          {DataHandler(data?.militaryService , "Military Service")}
          {DataHandler(data?.DateOfBirth , "Date of Birth")}
          {DataHandler(data?.licienceNumber , "License Number")}
          {DataHandler(data?.email , "Email Address")}
          {DataHandler(data?.postalCode , "Postal Code")}
          {DataHandler(data?.interest , "Interest")}
          {DataHandler(data?.experience?.companyName , "Experienced Company Name")}
          {DataHandler(data?.experience?.jobTitle , "Experienced Job Title")}
          {DataHandler(data?.experience?.starttime , "Experienced From")}
          {DataHandler(data?.experience?.endtime , "Experienced To")}
        </Form>
      </section>
    </>
  );
};

export default HOC(DriverDetails);
