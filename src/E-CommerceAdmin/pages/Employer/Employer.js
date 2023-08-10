/** @format */

import React, { useEffect, useState } from "react";
import {  Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import {
  GetAllEmployer,
} from "../../../Repository/Employer";
import { toast } from "react-toastify";
import Heading from "../Component/Heading";
import Filter from "../Component/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import {  Form, Button } from "react-bootstrap";

const Employer = () => {  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.name?.toLowerCase().includes(query?.toLowerCase()) || i?.email?.toLowerCase()?.includes(query?.toLowerCase())
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



  useEffect(() => {
    GetAllEmployes();
  }, []);


  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {

    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [companyType, setType] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [email, setEmail] = useState("");
    const [exactAddress, setAddress] = useState("");
    const [website, setWebsite] = useState("");

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const url = "https://gadi-driver-u8ym.vercel.app/api/v1/admin/addEmployee";
      try{
        const {data} = await axios.post(url,{
          phone, gender, companyType, name, details, email, exactAddress, website
        },{
          headers:{Authorization : `Bearer ${localStorage.getItem("Token")}`}
        })
        console.log(data);
        GetAllEmployes();
        props.onHide();
      }catch(err){
        console.log(err);
      }
    }

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Create New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Type</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={(e)=>setType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="COMPANY">Company</option>
                <option value="INDIVISUAL">INDIVIDUAL</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e)=>setWebsite(e.target.value)}
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


  const [modalShow2, setModalShow2] = useState(false);
  const [name, setName] = useState("");
  const [ids, setIde] = useState("");

  function DeleteModal(props) {

    const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(`https://gadi-driver-u8ym.vercel.app/api/v1/admin/${ids}`);
        toast.success(data.message);
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


  return (
    <>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <DeleteModal 
            show={modalShow2} onHide={() => 
            setModalShow2(false)} 
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
                          onClick={() =>{
                            setIde(i._id);
                            setName(i.category);
                            setModalShow2(true);
                          }}
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

export default HOC(Employer);
