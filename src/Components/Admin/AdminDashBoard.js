import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import ResponseUserTable from "./ResponseUserTable";
import moment from "moment";

export default function AdminDashBoard() {
  const [processAgent, setProcessAgent] = useState([]);
  const [checkDate, setCheckDate] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tabledata, setTabledata] = useState([]);
  const [launchAgent, setLaunchAgent] = useState({ name: "" });

  const ApiList = async (myTeam) => {
    const newTeam = myTeam || "";
    try {
      const resp = await baseURL.get(`/fetch/user/team?team=${newTeam}`);
      if (resp.status === 200) {
        setTabledata(resp.data.data);
        console.log("hello data table ", resp.data.data);
      }

      const ret = await baseURL.get("/openai/checked-date");
      setCheckDate(moment(ret.data));
    } catch (error) {
      toast.error(" Something went wrong!", {
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

  const LaunchAgent = async () => {
    try {
      const resp = await baseURL.post("/launchPhantomAgent");

      // return resp.data;
      if (resp.status === 200) {
        setLaunchAgent(resp.data);
        toast.success("successfuly launched", {
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
        alert("daat");
      }

      // console.log("data launch  agent", resp.data);
    } catch (error) {
      toast.error(" Something went wrong!", {
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

  const CreateAgent = async () => {
    try {
      const resp = await baseURL.post("/createPhantomAgent", launchAgent);
      if (resp.status === 200 && !launchAgent.name === "") {
        setShow(false);
        setLaunchAgent(resp.data);

        toast.success("Created successfuly ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLaunchAgent({ name: "" });
      } else {
        toast.error("Something went wrong.!", {
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
      toast.error("Something went wrong.!", {
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

  const ProcessedAggent = async () => {
    try {
      const resp = await baseURL.post("/fetchPhantomAgentOutput");
      if (resp.status === 200) {
        setProcessAgent(resp.data);
        console.log(resp.data.message_status);
        toast.success(resp.data.message_status, {
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
      toast.error(" Something went wrong!", {
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
  useEffect(() => {
    ApiList();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2>Last checked date: {checkDate.format && checkDate.format('YYYY/M/D hh:mm a')}</h2>
          </div>
          <div className="col-5">
            <div>
              <Button
                style={{ marginRight: "16px" }}
                variant="primary"
                onClick={handleShow}
              >
                CreateAgent
              </Button>
              <Button
                style={{ marginRight: "16px" }}
                onClick={() => LaunchAgent()}
              >
                Launch Agent
              </Button>

              <Button
                style={{ marginRight: "16px" }}
                variant="primary"
                onClick={() => ProcessedAggent()}
              >
                Process Agent
              </Button>
            </div>
            <div>
              <div className="col">
                <Modal
                  show={show}
                  onHide={handleClose}
                  style={{ marginTop: "10%", width: "100%", height: "100vh" }}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <center>Create Agent</center>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      aria-label="cookie name"
                      className="form-control"
                      placeholder="please enter name"
                      type="text"
                      value={launchAgent.name}
                      onChange={(e) => {
                        launchAgent.name = e.target.value;
                        setLaunchAgent({ ...launchAgent });
                      }}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => CreateAgent()}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tabledata &&
        tabledata.map((item, index) => (
          <ResponseUserTable
            key={index}
            userId={item._id}
            userName={item.username}
          />
        ))}
      <div>
        <table style={{ marginTop: "5%" }} className="table table-bordered">
          <thead>
            <tr>
              <th>username</th>
              <th>team</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {tabledata &&
              tabledata.map((item, index) => (
                <>
                  {item.team === "Admin" ? null : (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.team}</td>
                      <td>{item.email}</td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
