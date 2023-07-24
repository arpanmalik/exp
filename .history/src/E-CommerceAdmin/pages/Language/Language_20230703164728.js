/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";
import InfoAlert from "../Component/InfoAlert";

const Language = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/languages"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.language?.toLowerCase().includes(query?.toLowerCase())
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

  function MyVerticallyCenteredModal(props) {
    const [language, setLanguage] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/languages",
          { language }
        );
        toast.success(data.message);
        fetchHandler();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const EditHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://gadi-driver-u8ym.vercel.app/api/v1/languages/${id}`,
          { language }
        );
        toast.success(data.message);
        fetchHandler();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit   ? "Edit Language" : "Create New"} 
                      </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? EditHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://gadi-driver-u8ym.vercel.app/api/v1/languages/${id}`
      );
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <Heading title={"Language"} />

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Language ( Total : {data?.length} )
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Create New
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <InfoAlert message="No Language Found" />
          ) : (
            <>
              <Filter setQuery={setQuery} placeholder={"Search By Language"} />

              <div className="overFlowCont">
                {slicedData?.length === 0 || !slicedData ? (
                  <InfoAlert message={`No Matching Data with this ${query}`} />
                ) : (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>SNo.</th>
                          <th>Language</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedData?.map((i, index) => (
                          <tr key={index}>
                            <td> #{index + 1} </td>
                            <td> {i.language} </td>
                            <td>
                              <i
                                className="fa-sharp fa-solid fa-trash"
                                onClick={() => deleteHandler(i._id)}
                              ></i>
                            </td>
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

export default HOC(Language);
