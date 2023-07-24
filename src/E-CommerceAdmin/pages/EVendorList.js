/** @format */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EVendorList = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

    // Pagination and Filter 
    const [query, setQuery] = useState("");
    const [currentPage2, setCurrentPage2] = useState(1);
    const [postPerPage2] = useState(10);
    const lastPostIndex2 = currentPage2 * postPerPage2;
    const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  
    let pages2 = [];
  
    const TotolData = query
      ? data?.filter(
          (i) =>
            i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
            i?.email?.toLowerCase().includes(query?.toLowerCase())
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
  

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/user"
      );
      setData(data.users.filter((i) => i.role.includes("seller")));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const postHandler = async (e) => {
      e.preventDefault();
      if (password === passwordConfirmation) {
        try {
          const { data } = await axios.post(
            "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/auth/register",
            {
              name,
              username: name,
              email,
              password,
              passwordConfirmation,
              phone,
              role: "seller",
            }
          );
          toast.success(`${data?.user?.name} Created `);
          fetchData();
          props.onHide();
        } catch (e) {
          console.log(e);
          toast.error(e.response.data.message);
        }
      } else {
        setPasswordError(true);
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
            Add Seller
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordError ? (
            <Alert variant="danger">Passwords do not Match</Alert>
          ) : (
            ""
          )}
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                minLength={8}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/user/${id}`
      );
      toast.success(data.message);
      fetchData();
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

      <p className="headP">Dashboard / Vendors</p>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Vendor ( Total : {data?.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Vendor
        </button>
      </div>

      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search for Customers"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td> {i.name} </td>
                      <td> {i.email} </td>
                      <td>
                        <Badge bg="success">{i.role}</Badge>
                      </td>
                      <td> {i.phone} </td>
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

                <button onClick={() => setCurrentPage2(pages2?.length)} className={currentPage2 === pages2?.length ? "activePage" : ""} > 
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
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(EVendorList);
