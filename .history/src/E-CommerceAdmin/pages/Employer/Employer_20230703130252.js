/** @format */

import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import {
  AddEmployer,
  DeleteEmployer,
  GetAllEmployer,
} from "../../../Repository/Employer";
import { toast } from "react-toastify";
import Heading from "../Component/Heading";
import Filter from "../Component/Filter";

const Employer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.employer?.toLowerCase().includes(query?.toLowerCase())
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

  const GetAllEmployes = async () => {
    try {
      const { data } = await GetAllEmployer();
      setData(data.data);
    } catch (E) {
      console.log(E);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [employer, setEmployer] = useState("");

    const CreateEmployer = async (e) => {
      e.preventDefault();
      try {
        const { data } = await AddEmployer(employer);
        toast.success(`${data?.msg?.employer} Created Successfully`);
        GetAllEmployes();
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
            Add Employer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={CreateEmployer}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmployer(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="outline-success">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    GetAllEmployes();
  }, []);

  const DelteHandler = async (id) => {
    try {
      const { data } = await DeleteEmployer(id);
      toast.success(data.message);
      GetAllEmployes();
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
      <section style={{ padding: "20px" }}>
        <Heading title={"Employer's"} />
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            All Employers ( Total : {data?.length} )
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
          <Filter setQuery={setQuery} placeholder={"Search By Employer Name"} />
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.name} </td>
                    <td> {i.email} </td>
                    <td> {i.phone} </td>
                    <td> {i.gender} </td>
                    <td>
                    <span className="flexCont">
                                <Link to={`/driver/${i._id}`}>
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <i
                                  className="fa-sharp fa-solid fa-trash"
                                  onClick={() => deleteHandler(i._id)}
                                ></i>
                              </span>
                      <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => DelteHandler(i._id)}
                      ></i>
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

export default HOC(Employer);
