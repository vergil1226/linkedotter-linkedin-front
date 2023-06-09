import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { Table, Modal, Button } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ChatMessages from "./Chatboard";

export default function ResponseUserTable({ userId, userName }) {
  const [messages, setMessages] = useState([]);
  const [thread, setThread] = useState([]);
  const [active, setactive] = useState(1);
  const [items, setitems] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleCloseMessageModal = () => {
    setSelectedUserName("");
    setShowMessageModal(false);
  }

  const initMessages = async (page) => {
    try {
      const resp = await baseURL.post("/fetch/all/user-messages", {
        userId,
        page,
        limit: 10,
      });
      setMessages(resp.data.data);
      console.log(resp.data.data);

      let dataCount = [];
      for (
        let number = 1;
        number <= Math.ceil(resp.data.count / 10);
        number++
      ) {
        dataCount.push(number);
      }
      setitems([...dataCount]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessageThread = async (threadUrl, firstName) => {
    try {
      const resp = await baseURL.post("fetch/all/message-thread", {
        threadUrl,
      });
      console.log(resp.data.data);
      console.log("Name", firstName);
      setSelectedUserName(firstName);
      setThread(resp.data.data);
      setShowMessageModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initMessages();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h1>{userName}</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th className="col-xxl-1 col-xl-2 col-md-3 col-sm-3">
                LastReply Time
              </th>
              <th>Last Reply content</th>
              <th>Interested?</th>
              <th>LinkedIn URL</th>
            </tr>
          </thead>
          <tbody>
            {messages &&
              messages.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstnameFrom + " " + item.lastnameFrom}</td>
                  <td>{item.profile[0]?.company}</td>
                  <td>{item.profile[0]?.jobTitle}</td>
                  <td>
                    <Moment format="mm:hh DD-MM-YY">
                      {item.lastMessageDate}
                    </Moment>
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => getMessageThread(item.threadUrl, item.firstnameFrom)}
                    dangerouslySetInnerHTML={{ __html: item.message }}
                  ></td>
                  <td>{item.isInterested ? "Yes" : "No"}</td>
                  <td>
                    <a href={item.lastMessageFromUrl}>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {messages.length === 0 ? (
          <h2
            style={{
              border: "1px solid #e3e3e3",
              marginTop: -16,
              height: 100,
              verticalAlign: "middle",
              lineHeight: "100px",
            }}
          >
            No Data!
          </h2>
        ) : null}
        <Pagination>
          {items.map((number) => (
            <Pagination.Item
              onClick={() => {
                setactive(number);
                initMessages(number);
              }}
              key={number}
              active={number === active}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal
        show={showMessageModal}
        centered
        onHide={handleCloseMessageModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {thread.map((item, index) => {
            return (
              <ChatMessages
                key={index}
                avatar={item.profileUrl}
                side={item.firstName === selectedUserName ? "left" : "right"}
                messages={[item.message]}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseMessageModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
