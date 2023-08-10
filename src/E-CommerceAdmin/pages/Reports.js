import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import Filter from "./Component/Filter";
import Heading from "./Component/Heading";
import InfoAlert from "./Component/InfoAlert";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const Report = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("Token");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/admin/report/getAllReport",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(data.data);
      console.log(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const [cat, setCat] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/category"
      );
      setCat(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHandler();
    getCategory();
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

  function MyVerticallyCenteredModal(props) {
    const [plan, setPlan] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/jobType",
          {
            jobType: plan,
          }
        );
        toast.success(`${data.jobType} is Created`);
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
          `https://gadi-driver-u8ym.vercel.app/api/v1/jobType/${id}`,
          {
            jobType: plan,
          }
        );
        toast.success(`${data.jobType} is Created`);
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
            {edit ? "Edit Existing One" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? EditHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="">Select</option>
                {cat?.map((ele, i) => (
                  <>
                    <option value={ele?._id}>{ele?.category}</option>
                  </>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Video</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Create
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
          `https://gadi-driver-u8ym.vercel.app/api/v1/posts/${ids}`
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
          <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
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
              <Button variant="outline-danger" onClick={deleteHandler}>
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

  const [modalShow3, setModalShow3] = useState(false);
  const [rid, setRid] = useState("");

  function MyVerticallyCenteredModal3(props) {
    const [data, setData] = useState([]);
    const getSRP = async () => {
      const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/viewReport/${rid}`;
      try {
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data?.data);
        setData(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      getSRP();
    }, []);

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Edit Existing One" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="srp">
            <div className="srp1">
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.report?.map((ele, i) => (
                    <>
                      <tr>
                        <td>{ele?.user?.name}</td>
                        <td>{ele?.Comment}</td>
                        <td>{ele?.date?.slice(0, 10)}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
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
      <MyVerticallyCenteredModal3
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
      <DeleteModal show={modalShow2} onHide={() => setModalShow2(false)} />
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
            All Reports ( Total : {data?.length} )
          </span>
          {/* <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Create New
          </button> */}
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
                          <th>Image/Video</th>
                          <th>Like Count</th>
                          <th>Comment Count</th>
                          <th>Report Count</th>
                          <th>Actions</th>
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
                            <td> {i.postId.likeCount} </td>
                            <td> {i.postId.commentCount} </td>
                            <td> {i.reportCount} </td>
                            <td>
                              <span className="flexCont">
                                <i
                                  className="fa-sharp fa-solid fa-trash"
                                  onClick={() => {
                                    setIde(i._id);
                                    setName(i.category);
                                    setModalShow2(true);
                                  }}
                                ></i>
                                <i
                                  class="fa-solid fa-eye"
                                  onClick={() => {
                                    setRid(i?.postId?._id);
                                    setModalShow3(true);
                                  }}
                                ></i>
                                {/* <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={() => {
                                    setEdit(true);
                                    setId(i._id);
                                    setModalShow(true);
                                  }}
                                ></i> */}
                              </span>
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

export default HOC(Report);
