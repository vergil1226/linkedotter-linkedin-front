import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function ResponseUserTable({ userId, userName }) {
  const [messages, setMessages] = useState([]);
  const [active, setactive] = useState(1);
  const [items, setitems] = useState([]);

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

  useEffect(() => {
    initMessages();
  }, []);

  return (
    <div style={{ width: "100%", padding: "50px" }}>
      <h1>{userName}</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Person Name</th>
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

                <td>
                  <Moment format="mm:hh DD-MM-YY">
                    {item.lastMessageDate}
                  </Moment>
                </td>
                <td dangerouslySetInnerHTML={{ __html: item.message }}></td>
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
      {messages.length === 0 ? <h2 style={{ border: "1px solid #e3e3e3", marginTop: -16, height: 100, verticalAlign: "middle", lineHeight: "100px"}}>No Data!</h2> : null}
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
  );
}
