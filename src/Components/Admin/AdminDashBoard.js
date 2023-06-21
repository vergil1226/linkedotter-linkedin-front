import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import ResponseUserTable from "./ResponseUserTable";
import moment from "moment-timezone";

export default function AdminDashBoard() {
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
      if (resp.status === 200 && resp.data.status !== "error") {
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
        toast.warning(resp.data.msg, { position: "top-right" });
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
        if (resp.data.status === "success") {
          toast.success(resp.data.message, {
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
          toast.error(resp.data.message, {
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
            <h2>Last checked date: {checkDate.format && checkDate.tz("America/New_York").format("YYYY/M/D hh:mm a")}</h2>
          </div>
          <div className="col-5">
            <div>
              <Button style={{ marginRight: "16px" }} variant="primary" onClick={handleShow}>
                CreateAgent
              </Button>
              <Button style={{ marginRight: "16px" }} onClick={() => LaunchAgent()}>
                Launch Agent
              </Button>

              <Button style={{ marginRight: "16px" }} variant="primary" onClick={() => ProcessedAggent()}>
                Process Agent
              </Button>
            </div>
            <div>
              <div className="col">
                <Modal show={show} onHide={handleClose} style={{ marginTop: "10%", width: "100%", height: "100vh" }} animation={false}>
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
        {tabledata && tabledata.map((item, index) => (item.username === "admin" ? null : <ResponseUserTable key={index} userId={item._id} userName={item.username} />))}
        <div style={{ padding: "0 50px" }}>
          <table style={{ marginTop: "5%" }} className="table table-bordered">
            <thead>
              <tr>
                <th>User Name</th>
                <th>TTA (Positive Reply)</th>
                <th>Reply Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {tabledata &&
                tabledata.map((item, index) => (
                  <>
                    {item.team === "admin" ? null : (
                      <tr key={index}>
                        <td>{item.username}</td>
                        <td>{Math.round(item.tta_value)}h : {moment.duration(item.tta_value, 'hours').minutes()}m</td>
                        <td>{item.quality_score}</td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
