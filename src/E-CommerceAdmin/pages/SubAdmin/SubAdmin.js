import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Filter from "../Component/Filter";
import Heading from "../Component/Heading";
import InfoAlert from "../Component/InfoAlert";
import axios from "axios";

const SubAdmin = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
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

  const [perm, setPerm] = useState({});

  const token = localStorage.getItem("Token");

  const getPerm = async () => {
    const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/64b7d10882c930c6453f49bd`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data?.data?.permissions);
      setPerm(data?.data?.permissions);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/admin/getAllsubAdmins",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(data.data);
      //console.log("res", data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    getPerm();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://gadi-driver-u8ym.vercel.app/api/v1/admin/${id}`,
        {headers:{Authorization : `Bearer ${token}`}}
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [vehicletype, setVihcleType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [addCategory, setAddCategory] = useState(true);
    const [editCategory, setEditCategory] = useState(true);
    const [viewCategory, setViewCategory] = useState(true);
    const [deleteCategory, setDeleteCategory] = useState(true);
    const [addCategoryInterest, setAddCategoryInterest] = useState(true);
    const [editCategoryInterest, setEditCategoryInterest] = useState(true);
    const [viewCategoryInterest, setViewCategoryInterest] = useState(true);
    const [deleteCategoryInterest, setDeleteCategoryInterest] = useState(true);
    const [addJobType, setAddJobType] = useState(false);
    const [editJobType, setEditJobType] = useState(false);
    const [viewJobType, setViewJobType] = useState(false);
    const [deleteJobType, setDeleteJobType] = useState(false);
    const [addvehicletype, setAddvehicletype] = useState(false);
    const [editvehicletype, setEditvehicletype] = useState(false);
    const [viewvehicletype, setViewvehicletype] = useState(false);
    const [deletevehicletype, setDeletevehicletype] = useState(false);
    const [postManagement, setPostmanagement] = useState(false);
    const [notificationManagement, setNotificationmanagement] = useState(false);
    const [permissions, setPermission] = useState({});
    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://gadi-driver-u8ym.vercel.app/api/v1/admin/addsubAdmin",
          { name, email, password, permissions:{ addCategory, editCategory, viewCategory, deleteCategory, addCategoryInterest,
            editCategoryInterest, viewCategoryInterest, deleteCategoryInterest, addJobType, editJobType, viewJobType,
            deleteJobType, addvehicletype, editvehicletype, viewvehicletype, deletevehicletype, postManagement, notificationManagement}
        },{
            headers:{Authorization : `Bearer ${token}`}
        }
        );
        console.log(data);
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
          `https://gadi-driver-u8ym.vercel.app/api/v1/admin/editsubAdmin/${id}`,
          { name, email, password, permissions : {addCategory, editCategory, viewCategory, deleteCategory, addCategoryInterest,
            editCategoryInterest, viewCategoryInterest, deleteCategoryInterest, addJobType, editJobType, viewJobType,
            deleteJobType, addvehicletype, editvehicletype, viewvehicletype, deletevehicletype, postManagement, notificationManagement}
        },{
            headers:{Authorization : `Bearer ${token}`}
        }
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Category</Form.Label>
              <Form.Control as="select" onChange={(e)=>setAddCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edit Category</Form.Label>
              <Form.Control as="select" onChange={(e)=>setEditCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>View Category</Form.Label>
              <Form.Control as="select" onChange={(e)=>setViewCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delete Category</Form.Label>
              <Form.Control as="select" onChange={(e)=>setDeleteCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Category Interest</Form.Label>
              <Form.Control as="select" onChange={(e)=>setAddCategoryInterest(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edit Category Interest</Form.Label>
              <Form.Control as="select" onChange={(e)=>setEditCategoryInterest(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>View Category Interest</Form.Label>
              <Form.Control as="select" onChange={(e)=>setViewCategoryInterest(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delete Category Interest</Form.Label>
              <Form.Control as="select" onChange={(e)=>setDeleteCategoryInterest(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Job Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setAddJobType(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edit Job Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setEditJobType(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>View Job Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setViewJobType(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delete Job Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setDeleteJobType(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add vehicle Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setAddvehicletype(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edit vehicle Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setEditvehicletype(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>View vehicle Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setViewvehicletype(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delete vehicle Type</Form.Label>
              <Form.Control as="select" onChange={(e)=>setDeletevehicletype(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Post Management</Form.Label>
              <Form.Control as="select" onChange={(e)=>setPostmanagement(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notification Management</Form.Label>
              <Form.Control as="select" onChange={(e)=>setNotificationmanagement(e.target.value)}>
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
            {edit ? (
              <Button variant="outline-success" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="outline-success" type="submit" >
                Create
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [idd, setIdd] = useState("");

  function MyVerticallyCenteredModal2(props) {
    const [info, setInfo] = useState({})
    const getAdmin = async()=>{
        const url = `https://gadi-driver-u8ym.vercel.app/api/v1/admin/${idd}`;
        try{
            const {data} = await axios.get(url,{
                headers:{Authorization : `Bearer ${token}`}
            })
            console.log(data?.data);
            setInfo(data?.data);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getAdmin();
    },[])
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="one">
            <div>Name</div>
            <div>{info?.name}</div>
          </div>
          <div className="one">
            <div>Email</div>
            <div>{info?.email}</div>
          </div>
          <h4 className="two">
            Permissions
          </h4>
          <div className="one">
            <div>Add Category</div>
            <div>{info?.permissions?.addCategory?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Edit Category</div>
            <div>{info?.permissions?.editCategory?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>View Category</div>
            <div>{info?.permissions?.viewCategory?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Delete Category</div>
            <div>{info?.permissions?.deleteCategory?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Add Category Interest</div>
            <div>{info?.permissions?.addCategoryInterest?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Edit Category Interest</div>
            <div>{info?.permissions?.editCategoryInterest?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>View Category Interest</div>
            <div>{info?.permissions?.viewCategoryInterest?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Delete Category Interest</div>
            <div>{info?.permissions?.deleteCategoryInterest?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Add Job Type</div>
            <div>{info?.permissions?.addJobType?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Edit Job Type</div>
            <div>{info?.permissions?.editJobType?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>View Job Type</div>
            <div>{info?.permissions?.viewJobType?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Delete Job Type</div>
            <div>{info?.permissions?.deleteJobType?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Add Vehicle Type</div>
            <div>{info?.permissions?.addvehicletype?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Edit Vehicle Type</div>
            <div>{info?.permissions?.editvehicletype?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>View Vehicle Type</div>
            <div>{info?.permissions?.viewvehicletype?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Delete Vehicle Type</div>
            <div>{info?.permissions?.delhivehicletype?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Post Management</div>
            <div>{info?.permissions?.postManagement?"True" : "False"}</div>
          </div>
          <div className="one">
            <div>Notification Management</div>
            <div>{info?.permissions?.notificationManagement?"True" : "False"}</div>
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
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
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
            All Sub Admins ( Total : {data?.length} )
          </span>

          {perm?.addvehicletype ? (
            <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
            >
              Create New
            </button>
          ) : (
            ""
          )}
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
                          <th>Name</th>
                          <th>email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slicedData?.map((i, index) => (
                          <tr key={index}>
                            <td> #{index + 1} </td>
                            <td> {i?.name} </td>
                            <td>{i?.email}</td>
                            <td>
                              <span className="flexCont">
                                {perm?.deletevehicletype ? (
                                  <i
                                    className="fa-sharp fa-solid fa-trash"
                                    onClick={() => {
                                      deleteHandler(i._id);
                                    }}
                                  ></i>
                                ) : (
                                  ""
                                )}
                                <i class="fa-solid fa-eye" onClick={()=>{
                                    setIdd(i?._id);
                                    setModalShow2(true);
                                }} ></i>
                                {perm?.editvehicletype ? (
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

export default HOC(SubAdmin);
