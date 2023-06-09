import React, { useEffect, useRef, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { Table, Modal, Button, Spinner } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ChatBoard from "./Chat/ChatBoard";

export default function ResponseUserTable({ userId, userName }) {
  const [messages, setMessages] = useState([]);
  const [thread, setThread] = useState([]);
  const [active, setactive] = useState(1);
  const [items, setitems] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleCloseMessageModal = () => {
    setSelectedUserName("");
    setShowMessageModal(false);
  };

  const initMessages = async (page) => {
    try {
      setIsTableLoading(true);
      const resp = await baseURL.post("/fetch/all/user-messages", {
        userId,
        page,
        limit: 10,
      });
      setMessages(resp.data.data);
      console.log(resp.data.data);

      let dataCount = [];
      for (let number = 1; number <= Math.ceil(resp.data.count / 10); number++) {
        dataCount.push(number);
      }
      setitems([...dataCount]);
      setIsTableLoading(false);
    } catch (error) {
      setIsTableLoading(false);
      console.log(error.message);
    }
  };

  const getMessageThread = async (threadUrl, firstName) => {
    try {
      setIsPageLoading(true);
      const resp = await baseURL.post("fetch/all/message-thread", {
        threadUrl,
      });
      console.log(resp.data.data);
      console.log("Name", firstName);
      setSelectedUserName(firstName);
      setShowMessageModal(true);
      setThread(resp.data.data);
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    initMessages();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <h1>{userName}</h1>
        <Table striped bordered hover responsive style={{ position: "relative" }}>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th className="col-xxl-1 col-xl-2 col-md-3 col-sm-3">LastReply Time</th>
              <th>Last Reply content</th>
              <th>Interested?</th>
              <th>LinkedIn URL</th>
            </tr>
          </thead>
          <tbody>
            {isTableLoading && (
              <tr>
                <td colSpan={7} style={{ height: "500px", verticalAlign: "middle" }}>
                  <Spinner animation="border" variant="secondary" />
                </td>
              </tr>
            )}
            {!isTableLoading && (
              <>
                {messages.length > 0 &&
                  messages.map((item, index) => (
                    <tr key={index}>
                      <td>{item.firstnameFrom + " " + item.lastnameFrom}</td>
                      <td>{item.profile[0]?.company}</td>
                      <td>{item.profile[0]?.jobTitle}</td>
                      <td>
                        <Moment format="mm:hh DD-MM-YY">{item.lastMessageDate}</Moment>
                      </td>
                      <td style={{ cursor: "pointer" }} onClick={() => getMessageThread(item.threadUrl, item.firstnameFrom)} dangerouslySetInnerHTML={{ __html: item.message }}></td>
                      <td>{item.isInterested ? "Yes" : "No"}</td>
                      <td>
                        <a href={item.lastMessageFromUrl}>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      </td>
                    </tr>
                  ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={7}>No Data!</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
          {isPageLoading && (
            <div style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0", background: "rgba(0,0,0,0.3)" }}>
              <Spinner animation="grow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)" }} />
            </div>
          )}
        </Table>
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

      <Modal show={showMessageModal} centered onHide={handleCloseMessageModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto", height: "350px" }}>
          <ChatBoard chats={thread.map((item) => ({ side: item.firstName == selectedUserName ? "left" : "right", avatar: item.imgUrl, message: item.message }))} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
