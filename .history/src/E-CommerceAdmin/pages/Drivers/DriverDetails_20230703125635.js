/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DriversDetails } from "../../../Repository/Employer";
import HOC from "../../layout/HOC";

const DriverDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const FetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://gadi-driver-u8ym.vercel.app/api/v1/admin/${id}`);
      setData(data.data);
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
      <section>
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


          {data?.firstName ? (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.firstName + " " + data?.lastName}
              />
            </Form.Group>
          ) : (
            ""
          )}
          
          {DataHandler(data?.phone , "Phone Number")}
          {DataHandler(data?.gender , "Gender")}
          {DataHandler(data?.ResumeTitle , "Resume Title")}
          {DataHandler(data?.exactAddress , "Exact Address")}
          {DataHandler(data?.militaryService , "Military Service")}
          {DataHandler(data?.DateOfBirth , "Date of Birth")}
          {DataHandler(data?.DateOfBirth , "Date of Birth")}
       



     

          {data?. ? (
            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.licienceNumber}
              />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.email ? (
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" disabled placeholder={data?.email} />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.postalCode ? (
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.postalCode}
              />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.interest ? (
            <Form.Group className="mb-3">
              <Form.Label>Interest</Form.Label>
              <Form.Control type="text" disabled placeholder={data?.interest} />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.experience?.companyName ? (
            <Form.Group className="mb-3">
              <Form.Label>Experienced Company Name</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.experience?.companyName}
              />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.experience?.jobTitle ? (
            <Form.Group className="mb-3">
              <Form.Label>Experienced Job title</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.experience?.jobTitle}
              />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.experience?.starttime ? (
            <Form.Group className="mb-3">
              <Form.Label>Experienced Start Time</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.experience?.starttime}
              />
            </Form.Group>
          ) : (
            ""
          )}

          {data?.experience?.endtime ? (
            <Form.Group className="mb-3">
              <Form.Label>Experienced End Time</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={data?.experience?.endtime}
              />
            </Form.Group>
          ) : (
            ""
          )}
 
        </Form>
      </section>
    </>
  );
};

export default HOC(DriverDetails);
