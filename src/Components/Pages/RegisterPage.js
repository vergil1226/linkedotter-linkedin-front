import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../ApiWork/BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [data_1, setData_1] = useState({
    username: "",
    email: "",
    password: "",
    team: "",
    user_type: "user",
  });
  const SingnUp = async (e) => {
    // const data = {
    //   username: "ume123shq",
    //   email: "rscrq@qgmail22.com",
    //   password: "1214q72",
    // };
    e.preventDefault();
    if (
      data_1.email == "" ||
      data_1.password == "" ||
      data_1.team == "" ||
      data_1.user_type == "" ||
      data_1.username == ""
    ) {
      toast.error("All field's are  requiered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const resp = await baseURL.post("/api/auth/signup", data_1);

      console.log("response is ", data_1);
      if (resp.status == 200) {
        localStorage.setItem("token", resp.data.token);
        toast.success("Registration successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };
  return (
    <div>
      <Container>
        <ToastContainer />
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Register
                  </h2>
                  <div className="mb-3 text-start">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label
                        >
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={data_1.username}
                          onChange={(e) => {
                            data_1.username = e.target.value;
                            setData_1({ ...data_1 });
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label
                        >
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={data_1.email}
                          onChange={(e) => {
                            data_1.email = e.target.value;
                            setData_1({ ...data_1 });
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Password
                        </Form.Label>

                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={data_1.password}
                          onChange={(e) => {
                            data_1.password = e.target.value;
                            setData_1({ ...data_1 });
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>
                          Team
                        </Form.Label>

                        <select
                          class="form-select form-control"
                          aria-label="Default select example"
                          placeholder="Password"
                          value={data_1.team}
                          onChange={(e) => {
                            data_1.team = e.target.value;
                            setData_1({ ...data_1 });
                          }}
                        >
                          <option value=""></option>
                          <option value="sales">Sales</option>
                          <option value="marketing">Marketing</option>
                          <option value="account">Account</option>
                        </select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button
                          onClick={(e) => SingnUp(e)}
                          variant="primary"
                          type="submit"
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to={"/login"} className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
