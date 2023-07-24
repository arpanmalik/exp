/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Spin, Alert } from "antd";
import Filter from "./Component/Filter";
import Heading from "./Component/Heading";

const Notification = () => {
  const data = [
    {
      
    }
  ]
  const [modalShow, setModalShow] = useState(false);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.message?.toLowerCase().includes(query?.toLowerCase())
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


  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`https://gadi-driver-u8ym.vercel.app/api/v1/noti/${id}`);
      toast.success(data.message);
   
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const UploadImages = (e) => {
      setLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/noti",
          {
            image,
            message,
          }
        );
        console.log(data);
        toast.success(`Created`);
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
            Create Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            {loading ? (
              <div className="SpinComp">
                <Spin tip="Uploading..." size="large">
                  <div className="content" />
                </Spin>
              </div>
            ) : (
              <Alert
                message="Image Uploaded Successfully"
                type="success"
                showIcon
                closable
              />
            )}

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => UploadImages(e)} />
            </Form.Group>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Message"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                onChange={(e) => setMessage(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="outline-success" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section style={{ padding: "20px" }}>
      <Heading title={"Notification's"} />
     
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Notification ( Total : {data?.length} )
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
        <Filter setQuery={setQuery} placeholder={"Search By Message"} />
     
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Image</th>
                  <th>Message</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>
                      {" "}
                      <img
                        src={i.image}
                        alt=""
                        style={{ width: "100px" }}
                      />{" "}
                    </td>
                    <td>{i.message}</td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-sharp fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default HOC(Notification);
