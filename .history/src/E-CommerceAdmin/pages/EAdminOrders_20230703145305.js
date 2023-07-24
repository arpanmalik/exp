/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdminOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);

  // Pagination and Filter
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const slicedData = data?.slice(firstPostIndex2, lastPostIndex2);

  for (let i = 1; i <= Math.ceil(data?.length / postPerPage2); i++) {
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

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/video"
      );
      setData(data.data);
    } catch (e) {
      console.log("Order Err=>", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function EditStatus(props) {
    const [video, setVideo] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const UploadImages = (e) => {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVideo(data.url);
          console.log(data.url)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/video",
          {
            vedio : video,
            startTime,
            endTime,
          }
        );
        toast.success("Created New");
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => UploadImages(e)}
              />
            </Form.Group>
            <p>OR</p>
            <Form.Group className="mb-3">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setVideo(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://gadi-driver-u8ym.vercel.app/api/v1/vedioo/${id}`
      );
      fetchData();
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>
      <EditStatus show={modalShow} onHide={() => setModalShow(false)} />
      <section>
        <p className="headP">Dashboard / Video</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Video's (Total : {data?.length})
          </span>

          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
          >
            Create New
          </button>
        </div>
        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Video </th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedData?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td>
                          {" "}
                          <a href={i.video} target="_blank" rel="noreferrer">
                            <Button>Video</Button>{" "}
                          </a>
                        </td>
                        <td>{i.startTime}</td>
                        <td>{i.endTime}</td>
                        <td>
                          {" "}
                          <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
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
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminOrders);
