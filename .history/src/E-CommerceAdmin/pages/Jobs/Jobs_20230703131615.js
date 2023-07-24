/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import HOC from "../../layout/HOC";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";

const Jobs = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.jobtitle?.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  let pages2 = [];

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setCurrentPage2(currentPage2 + 1);
  }

  function Prev() {
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  const FetchData = async () => {
    try {
      const { data } = await  axios.get("https://gadi-driver-u8ym.vercel.app/api/v1/jobServices") ;
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);



  return (
    <>


      <section style={{ padding: "20px" }}>
        <Heading title={"Jobs"} />
        <div
          className="pb-4 w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            All JOBS ( Total : {data?.length} )
          </span>
        </div>

        <section className="sectionCont">
          <Filter setQuery={setQuery} placeholder={"Search By Job Title"} />
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Image</th>
                  <th>Employer</th>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Contact Number</th>
                  <th>Salary Offered</th>
                  <th>Total Experience</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td>
                      <img src={i.image} alt="" style={{ width: "100px" }} />
                    </td>
                    <td> {i.userId} </td>
                    <td> {i.jobtitle} </td>
                    <td> {i.jobtype} </td>
                    <td> {i.contactNumber} </td>
                    <td> {i.salaryOffer} </td>
                    <td> {i.totalExperience} </td>
                    <td>
                        <Link to={`/jobs/${i._id}`}>
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>{" "}
          </div>

          <div className="pagination">
            <button onClick={() => Prev()} className="prevBtn">
              <i className="fa-solid fa-backward"></i>
            </button>
            {currentPage2 === 1 ? (
              ""
            ) : (
              <button onClick={() => setCurrentPage2(1)}>1</button>
            )}

            {pages2?.slice(currentPage2 - 1, currentPage2 + 3).map((i, index) =>
              i === pages2?.length ? (
                ""
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage2(i)}
                  className={currentPage2 === i ? "activePage" : ""}
                >
                  {" "}
                  {i}{" "}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage2(pages2?.length)}
              className={currentPage2 === pages2?.length ? "activePage" : ""}
            >
              {" "}
              {pages2?.length}{" "}
            </button>

            {currentPage2 === pages2?.length ? (
              ""
            ) : (
              <button onClick={() => Next()} className="nextBtn">
                {" "}
                <i className="fa-sharp fa-solid fa-forward"></i>
              </button>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(Jobs);
