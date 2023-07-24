/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";
import InfoAlert from "../Component/InfoAlert";

const Community = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/posts/All"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHandler();
    window.scrollTo(0, 0);
  }, []);

  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.topic?.toLowerCase().includes(query?.toLowerCase())
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
    window.scrollTo(0, 0);
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

  return (
    <>
      <section>
        <Heading title={"Post's"} />

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Post's ( Total : {data?.length} )
          </span>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <InfoAlert message="No Data Found" />
          ) : (
            <>
              <Filter setQuery={setQuery} placeholder={"Search By Location"} />

              <div className="overFlowCont">
                {slicedData?.length === 0 || !slicedData ? (
                  <InfoAlert message={`No Matching Data with this ${query}`} />
                ) : (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>SNo.</th>
                          <th>Image</th>
                          <th>User</th>
                          <th>Description</th>
                          <th>Like Count</th>
                          <th>Comment Count</th>
                          <th>Created Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedData?.map((i, index) => (
                          <tr key={index}>
                            <td> #{index + 1} </td>
                            <td>
                              <a
                                href={i.image_vedio}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Button>View</Button>
                              </a>
                            </td>
                            <td>
                              {" "}
                              {i.userId?.firstName +
                                " " +
                                i.userId?.lastName}{" "}
                            </td>
                            <td> {i.description} </td>
                            <td> {i.likeCount} </td>
                            <td> {i.commentCount} </td>
                            <td> {i.date?.slice(0, 10)} </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="pagination">
                      <button onClick={() => Prev()} className="prevBtn">
                        <i className="fa-solid fa-backward"></i>
                      </button>
                      {currentPage2 === 1 ? (
                        ""
                      ) : (
                        <button onClick={() => setCurrentPage2(1)}>1</button>
                      )}

                      {pages2
                        ?.slice(currentPage2 - 1, currentPage2 + 3)
                        .map((i, index) =>
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
                        className={
                          currentPage2 === pages2?.length ? "activePage" : ""
                        }
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
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Community);
