import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseURL from "../../ApiWork/BaseUrl";
const LoginPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", password: "" });

  const Login = async () => {
    // const resp = await axios.post(

    //   "https://nodejs-testnew.herokuapp.com/api/auth/signin"
    // );
    if (!data.username || !data.password) {
      return toast.error("All Inputs Fields are Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const resp = await baseURL.post("/api/auth/signin", data);
      if (resp.status == 200) {
        setData(resp.data);
        localStorage.setItem("TokenLogin", resp.data.accessToken);
        localStorage.setItem("Role", resp.data.user_type);
        console.log(resp.data);
        console.log("type", resp.data.user_type);
        if (resp.data.user_type == "admin") {
          navigate("/admin");
        } else if (resp.data.user_type == "user") {
          navigate("/");
        }
        toast.success(" Login successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("User Not found.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // if (data.name === "kunal4sd@gmail.com" && data.password === "1234") {
    //   localStorage.setItem("Role", "user");
    //   toast.success(" Login successfully", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   console.log("hello3");
    //   setTimeout(() => {
    //     // navigate("/");
    //     navigate("/userDash");
    //   }, 5000);
    // } else if (data.name == "admin" && data.password == "admin") {
    //   console.log("hello");
    //   localStorage.setItem("Role", "admin");
    //   toast.success(" Login successfully", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   setTimeout(() => {
    //     // navigate("/");
    //     navigate("/adim");
    //   }, 5000);
    // } else {
    //   // alert("Error :Please ente right password and email  ");
    //   toast.error(" Incorrect User Name and Password!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   //   navigate("/login");
  };

  return (
    <>
      <div classNameName="container mt-5">
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="assests/istockphoto-1281150061-612x612.jpg"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p
                      className="lead   mb-0 me-3"
                      style={{ fontSize: "52px", fontWeight: "42px" }}
                    >
                      {" "}
                      Login Page
                    </p>
                  </div>

                  <div className="divider d-flex align-items-center my-4"></div>
                  <div className="form-outline mb-4">
                    <label style={{ paddingRight: "94%" }}>Name</label>
                    <input
                      type="text"
                      value={data.username}
                          required 
                      onChange={(e) => {
                        data.username = e.target.value;
                        setData({ ...data });
                      }}
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid name "
                    />
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-3">
                    <label style={{ paddingRight: "99%" }}>Password</label>
                    <input
                      type="password"
                      id="form3Example4"
                      required
                      value={data.password}
                      onChange={(e) => {
                        data.password = e.target.value;
                        setData({ ...data });
                      }}
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                    <div id="password"></div>
                  </div>

                  {/* <div className="d-flex justify-content-between align-items-center">
                    {/* <!-- Checkbox --> */}
                  {/* <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label className="form-check-label" for="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div> */}

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                        width: "100%",
                      }}
                      onClick={() => Login()}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?
                      <Link to={"/register"} className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
