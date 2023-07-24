/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AddJob, AllJobs, DeleteJobs } from "../../../Repository/Employer";
import HOC from "../../layout/HOC";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";

const Jobs = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.jobtitle?.toLowerCase().includes(query?.toLowerCase())
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

  const FetchData = async () => {
    try {
      const { data } = await  axios.get("https://gadi-driver-u8ym.vercel.app/api/v1/jobServices") ;
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const DeleteHandler = async (id) => {
    try {
      const { data } = await DeleteJobs(id);
      toast.success(data.message);
      FetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [employer, setEmployer] = useState("");
    const [jobtitle, setJobTitle] = useState("");
    const [jobtype, setJobType] = useState("");
    const [vehicletype, setVehicleType] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [image, setImage] = useState("");
    const [salaryOffer, setSalaryOffer] = useState("");
    const [totalExperience, setTotalExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [autoClose, setAutoClose] = useState(false);
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [applicantChatYouDirectly, setChat] = useState("");
    const [startChat, setStartChat] = useState("");
    const uploadImage = image;
    const [detailsOfCompany, setDetailsOfCompany] = useState("");
    const [website, setWebsite] = useState("");
    const [Employes, setEmployes] = useState([]);

    const UploadImages = (e) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const GetAllEmployes = async () => {
      try {
        const { data } = await axios.get(
          "https://gadi-driver-u8ym.vercel.app/api/v1/employ"
        );
        setEmployes(data.msg);
      } catch (E) {
        console.log(E);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        GetAllEmployes();
      }
    }, [props]);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await AddJob(
          employer,
          jobtitle,
          jobtype,
          vehicletype,
          gender,
          description,
          contactNumber,
          location,
          address,
          postalCode,
          image,
          salaryOffer,
          totalExperience,
          qualification,
          closeDate,
          autoClose,
          fullName,
          email,
          applicantChatYouDirectly,
          startChat,
          uploadImage,
          detailsOfCompany,
          website
        );
        console.log(data);
        toast.success("Jobs Created Successfully");
        FetchData();
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Jobs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Select
              className="mb-3"
              onChange={(e) => setEmployer(e.target.value)}
            >
              <option>Select Employer</option>
              {Employes?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.employer}{" "}
                </option>
              ))}
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setJobType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setVehicleType(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Male and Female">Male and Female</option>
            </Form.Select>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Decription"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => UploadImages(e)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Salary Offered</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSalaryOffer(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Experience</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTotalExperience(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setQualification(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Close Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setCloseDate(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              onChange={(e) => setAutoClose(e.target.value)}
            >
              <option>Select AutoClose</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className="mb-3"
              onChange={(e) => setChat(e.target.value)}
            >
              <option>Select Chat</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>

            <Form.Select
              className="mb-3"
              onChange={(e) => setStartChat(e.target.value)}
            >
              <option>Select StartChat</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>DetailsOfCompany</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDetailsOfCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWebsite(e.target.value)}
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section style={{ padding: "20px" }}>
        <Heading title={"Jobs"} />
        <div
          className="pb-4 w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            All JOBS ( Total : {data?.length} )
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
          <Filter setQuery={setQuery} placeholder={"Search By Job Title"} />
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Image</th>
                  <th>Employer</th>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Contact Number</th>
                  <th>Salary Offered</th>
                  <th>Total Experience</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td>
                      <img src={i.image} alt="" style={{ width: "100px" }} />
                    </td>
                    <td> {i.employer?.employer} </td>
                    <td> {i.jobtitle} </td>
                    <td> {i.jobtype} </td>
                    <td> {i.contactNumber} </td>
                    <td> {i.salaryOffer} </td>
                    <td> {i.totalExperience} </td>
                    <td>
                      <span className="flexCont">
                        <Link to={`/jobs/${i._id}`}>
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                        <i
                          className="fa-sharp fa-solid fa-trash"
                          onClick={() => DeleteHandler(i._id)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>{" "}
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

export default HOC(Jobs);
