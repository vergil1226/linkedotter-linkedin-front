import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col, Image } from "react-bootstrap";

const ChatMessages = ({ avatar, messages, side }) => {
  const radius = 1;
  const size = "32px";

  const style = {
    avatar: {
      width: size,
      height: size,
    },
    msg: {
      padding: "8px 16px",
      borderRadius: 3,
      marginBottom: 0.5,
      display: "inline-block",
      wordBreak: "break-all",
      fontSize: "14px",
    },
    leftRow: {
      textAlign: "left",
    },
    left: {
      backgroundColor: "#f5f5f5",
      borderTopLeftRadius: radius,
    },
    rightRow: {
      textAlign: "right",
    },
    right: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      borderBottomRightRadius: radius,
    },
  };

  return (
    <Container
      style={
        side === "right" ? { display: "flex-end" } : { display: "flex-start" }
      }
    >
      <Row>
        {side === "left" && avatar && (
          <Col>
            <Image src={avatar} style={style.avatar} roundedCircle />
          </Col>
        )}
        <Col xs={10}>
          {messages.map((msg, i) => (
            <div style={style[`${side}Row`]} key={i}>
              <p
                align={"left"}
                style={{ ...style.msg, ...style[`${side}`] }}
              >
                {msg.split("\n").map((paragraph, index) => (
                  <span key={index}>
                    {paragraph}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

ChatMessages.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(["left", "right"]),
};
ChatMessages.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
};
ChatMessages.metadata = {
  name: "Chat Messages",
};
ChatMessages.codeSandbox = "";

export default ChatMessages;
