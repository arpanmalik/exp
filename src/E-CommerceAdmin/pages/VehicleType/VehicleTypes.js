/** @format */

/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";
import InfoAlert from "../Component/InfoAlert";
import axios from "axios";
import { MdSafetyDivider } from "react-icons/md";

const VehicleTypes = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const TotolData = query
    ? data?.filter((i) =>
        i?.vehicletype?.toLowerCase().includes(query?.toLowerCase())
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

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/vehicletype"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const [perm, setPerm] = useState({});

  const token = localStorage.getItem("Token");
  const ide = localStorage.getItem("id");
  const getPerm = async()=>{
    const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/${ide}`;
    try{
      const {data} = await axios.get(url,{
        headers:{Authorization : `Bearer ${token}`}
      })
      console.log(data?.data?.permissions);
      setPerm(data?.data?.permissions);
    }catch(err){
      console.log(err.message);
    }
  }


  useEffect(() => {
    fetchData();
    getPerm();
  }, []);



  function MyVerticallyCenteredModal(props) {
    const [vehicletype, setVihcleType] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/vehicletype",
          { vehicletype }
        );
        toast.success(` ${data.vehicletype} Created  `);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const EditHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://gadi-driver-u8ym.vercel.app/api/v1/vehicletype/${id}`,
          { vehicletype }
        );
        toast.success(data.message);
        fetchData();
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
            {edit ? " Edit  Type" : " Create New Vehicle Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? EditHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Vehcile</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setVihcleType(e.target.value)}
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
    const deleteHandler = async () => {
      try {
        const { data } = await axios.delete(
          `https://gadi-driver-u8ym.vercel.app/api/v1/vehicletype/${ids}`
        );
        toast.success(data.message);
        fetchData();
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

      <section style={{ padding: "20px" }}>
        <Heading title={"Vehicle Type's"} />
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Vehicle Type's ( Total : {data?.length} )
          </span>

          { perm?.addvehicletype ? <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Create New
          </button> : ""}
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <InfoAlert message="No Vehicle Type's Found" />
          ) : (
            <>
              <Filter
                setQuery={setQuery}
                placeholder={"Search By Vehicle Type"}
              />

              <div className="overFlowCont">
                {slicedData?.length === 0 || !slicedData ? (
                  <InfoAlert message={`No Matching Data with this ${query}`} />
                ) : (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>SNo.</th>
                          <th>Vehicle Type</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedData?.map((i, index) => (
                          <tr key={index}>
                            <td> #{index + 1} </td>
                            <td> {i.vehicletype} </td>
                            <td>
                              <span className="flexCont">
                                { perm?.deletevehicletype ? <i
                                  className="fa-sharp fa-solid fa-trash"
                                  onClick={() => {
                                    setIde(i._id);
                                    setName(i.category);
                                    setModalShow2(true);
                                  }}
                                ></i> : ""}
                                { perm?.editvehicletype ? <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={() => {
                                    setEdit(true);
                                    setId(i._id);
                                    setModalShow(true);
                                  }}
                                ></i> : ""}
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

export default HOC(VehicleTypes);
