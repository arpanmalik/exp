/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const GetMeThis = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  let pages2 = [];

  const TotolData = query
    ? data?.filter((i) =>
        i?.category?.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

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

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/categoryInterest"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const [perm, setPerm] = useState({});

  const token = localStorage.getItem("Token");
  const ide = localStorage.getItem("id");
  const getPerm = async () => {
    const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/${ide}`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
     // console.log("32rffg", data?.data);
      setPerm(data?.data?.permissions);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPerm();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [category, setCategory] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/categoryInterest",
          {
            category,
          }
        );
        toast.success(`${data.category} Created `);
        fetchdata();
        props.onHide();
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };

    const EditHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://gadi-driver-u8ym.vercel.app/api/v1/categoryInterest/${id}`,
          {
            category,
          }
        );
        toast.success(data.message);
        fetchdata();
        props.onHide();
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
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
            {edit ? "Edit Existing One" : " Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? EditHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Category Interest</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setCategory(e.target.value)}
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



  const [modalShow2, setModalShow2] = useState(false);
  const [name, setName] = useState("");
  const [ids, setIde] = useState("");

  function DeleteModal(props) {

    const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(
          `https://gadi-driver-u8ym.vercel.app/api/v1/categoryInterest/${ids}`
        );
        fetchdata();
        toast.success(data.message);
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
            Delete 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="DeleteModal">
          <div>
              <img
                src="https://t4.ftcdn.net/jpg/05/86/31/11/360_F_586311124_4oWWXClxu243Q4987LdHPty2b3EcaTTF.jpg"
                alt=""
              />
            </div>
            <div>
              <p>Do You Want to Delete </p>
            </div>
          

            <div>
              <Button variant="outline-danger" onClick={() => deleteHandler()}>
                Yes
              </Button>
              <Button variant="info" onClick={() => props.onHide()}>
                No
              </Button>
            </div>
          </div>
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
    <DeleteModal show={modalShow2} onHide={() => setModalShow2(false)} />
      <p className="headP">Dashboard / Category Interest</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Category Interest ( Total : {data.length} )
        </span>
        {perm?.addCategoryInterest ? (
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
          >
            Create New
          </button>
        ) : (
          ""
        )}
      </div>
      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Category</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td>{i.category}</td>
                  <td>
                    <span className="flexCont">
                      {perm?.deleteCategoryInterest ? (
                        <i
                          className="fa-sharp fa-solid fa-trash"
                          onClick={() => {
                            setIde(i._id);
                            setName(i.category);
                            setModalShow2(true);
                        }}
                        ></i>
                      ) : (
                        ""
                      )}
                      {perm?.editCategoryInterest ? (
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setEdit(true);
                            setId(i._id);
                            setModalShow(true);
                          }}
                        ></i>
                      ) : (
                        ""
                      )}
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
    </>
  );
};

export default HOC(GetMeThis);
