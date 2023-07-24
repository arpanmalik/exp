/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Alert, Table  } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Help = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://gadi-driver-u8ym.vercel.app/api/v1/help"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://gadi-driver-u8ym.vercel.app/api/v1/help/delete/${id}`
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section style={{ padding: "20px" }}>
        <p className="headP">Dashboard / Help & Support </p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Help & Support ( Total : {data?.length} )
          </span>
        </div>

        <section className="sectionCont">

          {data?.length === 0 || !data ? <Alert>No Data Found</Alert> }

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>User</th>
                  <th>Query</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>{i.user?.name}</td>
                    <td>{i.query}</td>
                    <td>
                      <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(Help);
