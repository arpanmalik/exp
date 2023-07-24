/** @format */

import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const ESubCategory = () => {
  const [error, setError] = useState(false);
  const  [ oldPassword , setOldPassword ] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword ] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const ResetPassword = async (e) => {
    e.preventDefault();try {
        const { data } = await axios.put(
          `https://gadi-driver-u8ym.vercel.app/api/v1/admin/changePassword`,
          {
            oldPassword,
            newPassword,
          } , {
            headers  : {
              Authorization : `Bearer ${token}`
            }
          }
        );
        toast.success("Password  Reset Successfully");
        console.log(data);
        toast.info("Please Login Again");
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <section>
        <p className="headP">Dashboard / Reset Password</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Reset Password
          </span>
        </div>

        <section className="sectionCont">
          <Container>
          {
            error ? <Alert variant="info">Passwords Do Not Match</Alert> : ""
          }
            <Form onSubmit={ResetPassword}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setpassword(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" required   onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Group>
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </section>
      </section>
    </>
  );
};

export default HOC(ESubCategory);
