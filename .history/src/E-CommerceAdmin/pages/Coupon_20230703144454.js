/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import Filter from "./Component/Filter";
import Heading from "./Component/Heading";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) => i?.desc?.toLowerCase().includes(query?.toLowerCase()))
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

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/Faq"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [question, set ] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/Faq",
          {
            question, answer
          }
        );
        fetchData();
        toast.success(`${data.desc} Created`);
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
            {" "}
            Create New FAQ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>FAQ</Form.Label>
              <Form.Control
                type="type"
                min={0}
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
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
        `https://gadi-driver-u8ym.vercel.app/api/v1/Faq/${id}`
      );
      console.log(data);
      fetchData();
      toast.success(` Deleted Successfully`);
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

      <Heading title={"FAQ's"} />

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All FAQ (Total : {data?.length} )
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
        <Filter setQuery={setQuery} placeholder={"Search By Description"} />

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.question} </td>
                  <td> {i.answer} </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(i._id)}
                    />
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
    </>
  );
};

export default HOC(Coupon);
