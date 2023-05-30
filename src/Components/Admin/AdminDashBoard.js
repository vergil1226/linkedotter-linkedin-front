import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { FormLabel, Table, Button, Modal } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
export default function AdminDashBoard() {
  const [messages, setMessages] = useState([]);
  const [Launched, setLaunched] = useState();
  const [processAgent, setProcessAgent] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tabledata, setTabledata] = useState([]);
  const [launchAgent, setLaunchAgent] = useState({ name: "" });
  const [items, setitems] = useState([]);
  const [active, setactive] = useState(1);
  const [activeTeam, setactiveTeam] = useState("");

  const Messages = async (team, active) => {
    try {
      const data = {
        team: team,
        limit: 10,
        page: active,
      };
// if
if(messages)
{
  const resp = await baseURL.post("/fetch/all/messages", data);
  setMessages(resp.data.data.data);
  // console.log("first", resp.data.data.count);
  let dataCount = [];
  for (
    let number = 1;
    number <= Math.ceil(resp.data.data.count / 10);
    number++
  ) {
    dataCount.push(number);
  }
  setitems([...dataCount]);
} 
}
catch (error) {
 // alert("api error ");
}
};

  const teams = [
    {
      value: "sales",
      name: "sales",
    },
    {
      value: "marketing",
      name: "marketing",
    },
    {
      value: "accounts",
      name: "accounts",
    },
  ];
  const ApiList = async (myTeam) => {
    const newTeam = myTeam || "";
    try {
      const resp = await baseURL.get(`/fetch/user/team?team=${newTeam}`);
      // console.log("first", resp);
      if (resp.status == 200) {
        setTabledata(resp.data.data);
        // console.log("hello data table ", resp.data.data);
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

  const LaunchAgent = async () => {
    try {
      const resp = await baseURL.post("/launchPhantomAgent");

      // return resp.data;
      if (resp.status == 200) {
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
      if (resp.status == 200 && !launchAgent.name == "") {
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
      if (resp.status == 200) {
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
    <>
      <div>
        <div class="container">
          {/* {console.log({ activeTeam })} */}
          <div class="row">
            <div class="col-8">
              <div>
                <label style={{ display: "inherit" }}>
                  <div style={{ textAlign: "left" }}>
                    <b>Please Select Your Team</b>
                  </div>
                  <select
                    onChange={(e) => {
                      const team = e.target.value;
                      setactiveTeam(team);
                      // ApiList(team);
                      setTimeout(() => {
                        Messages(team, 1);
                      });
                    }}
                    className="form-control "
                    style={{ width: "30%" }}
                    name="selectedFruit"
                  >
                    <option value="" disabled selected hidden>
                      Select You Team
                    </option>
                    {teams.map((item) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div class="col-4">
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
                <div class="col">
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
                {/* <form>
                <div
                  style={{
                    marginTop: "10%",
                    boxShadow: "gray 9px 9px 9px 8px",
                    alignContent: "center",
                    width: "40%",
                    height: "10vh",

                    marginLeft: "20%",
                  }}
                >
                  <label className="form -control">Create Agent</label>
                  <input
                    type="text"
                    value={launchAgent.name}
                    onChange={(e) => {
                      launchAgent.name = e.target.value;
                      setLaunchAgent({ ...launchAgent });
                    }}
                  ></input>
                  <button onClick={() => CreateAgent()}>Sumbit</button>
                </div>
              </form> */}
              </div>
            </div>
          </div>
        </div>
        {messages? (
          <div
            style={{
              marginTop: "10%",
              width: "100%",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* <th>user_id</th>
                <th>container_id</th>
                <th>createdAt</th> */}
                  <th>Full Name</th>
                  <th>Message From Me?</th>
                  <th>Message</th>
                  <th>Read Status</th>
                  <th>Last Message Date</th>
                  <th>Message Url</th>

                  {/* <th>updatedAt</th> */}
                </tr>
              </thead>
              <tbody>
                {messages &&
                  messages.map((item, index) => (
                    <tr key={index}>
                      {/* <td>{item.user_id}</td>
                    <td>{item.container_id}</td>
                    <td>{item.createdAt}</td> */}
                      <td>{item.firstnameFrom + " " + item.lastnameFrom}</td>
                      <td>{item.isLastMessageFromMe ? "Yes" : "No"}</td>
                      {/* {console.log("item.isLastMessageFromMe", item.readStatus)} */}

                      {/* <td>{item.lastnameFrom}</td> */}
                      <td>{item.message}</td>
                      <td>{item.readStatus ? "Yes" : "No"}</td>
                      <td>{item.lastMessageDate}</td>
                      <td>{item.lastMessageFromUrl}</td>

                      {/* <td>{item.updatedAt}</td> */}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Pagination>
              {items.map((number) => (
                <Pagination.Item
                  onClick={() => {
                    setactive(number);
                    Messages(activeTeam, number);
                  }}
                  key={number}
                  active={number === active}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
            {/* {messages ? (
            <table className="table table-responsive">
          
             
            </table> */}
          </div>
        ) : (
          <>
            <h1>No Data Found</h1>
            <img src="assests/Nodata.png"></img>
          </>
        )}
        <div>
          {activeTeam ? null : (
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
                   {item.team=="Admin"?null: <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.team}</td>
                      <td>{item.email}</td>
                    </tr>}
                    </>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
