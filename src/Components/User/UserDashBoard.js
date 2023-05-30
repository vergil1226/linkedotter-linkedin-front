import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import baseURL from "../../ApiWork/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { FormLabel } from "react-bootstrap";
export default function UserDashBoard() {
  const [data1, setData] = useState({ email: "" });
  const authToken = localStorage.getItem("token");
  const [tabledata, setTabledata] = useState([]);
  const [datacokkie, setDataCokkie] = useState({ cookie_value: "" });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Api = async (e) => {
    try {
      const resp = await baseURL.post("/api/auth/fetchUserLatestCookie", data1,{  headers: {
        "x-access-token": authToken,
      },});
      if (resp.status == 200) {
        setTabledata(resp.data.data);
        console.log("hello  data table", resp.data.data);
        toast.success(" Code Run successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({ email: "" });
      } else if (data1.email === "") {
        toast.error(" User Not found.!", {
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
    } catch {
      toast.error(" User Not found.!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setData({ email: "" });
      setTabledata();
    }
  };

  const handleCookie = async () => {
    console.log(datacokkie);
    try {
      const resp = await baseURL.post("/api/set/cookie", datacokkie,{  headers: {
        "x-access-token": authToken,
      },});
      // console.log("first", resp);
      if (resp.status == 200) {
        toast.success("Cookie value submitted succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShow(false);
        console.log(resp.data);
        setDataCokkie(resp.data);
        console.log("hello data", resp.data);
      }
    } catch (error) {
      toast.error(" Incorrect User Name and Password!", {
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
  };
  return (
    <div>
      <div>
        <div class="row">
          {/* <div class="col">
            <label style={{ width: "100%" }}>
              Please Select Your Team
              <select
                name="selectedFruit"
                style={{ width: "60%", height: "3.5vh" }}
              >
                <option value=" sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="account">Account</option>
              </select>
            </label>
          </div> */}
          <div class="col" style={{ width: "100%" }}>
            <input
              style={{ width: "40%" }}
              type="text"
              placeholder="Enter your email"
              value={data1.email}
              onChange={(e) => {
                data1.email = e.target.value;
                setData({ ...data1 });
              }}
            ></input>{" "}
            <button onClick={(e) => Api(e)}>Sumbit</button>
          </div>
          <div class="col">
            <Button variant="primary" onClick={handleShow}>
              Add Cookie
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              style={{ marginTop: "10%", width: "100%", height: "100vh" }}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <center>Add Cookie</center>{" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  aria-label="cookie name"
                  className="form-control"
                  placeholder="please enter Cookie"
                  type="text"
                  value={datacokkie.cookie_value}
                  onChange={(e) => {
                    datacokkie.cookie_value = e.target.value;
                    setDataCokkie({ ...datacokkie });
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleCookie()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: "80%" }}></div>
      {tabledata ? (
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Id</th>
              <th scope="col">UserId</th>
              <th scope="col">Cookie Value</th>
              <th scope="col">CreatedDate</th>
              <th scope="col">UpdateDate</th>
            </tr>
          </thead>
          <tbody>
            {tabledata.map((item, index) => (
              <tr key={index}>
                <td colspan="2">{item._id}</td>
                <td scope="row">{item.user_id}</td>
                <td scope="row">{item.cookie_value}</td>
                <td scope="row">{item.createdAt}</td>
                <td scope="row">{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No Data Found</h1>
      )}
      <ToastContainer />
    </div>
  );
}
