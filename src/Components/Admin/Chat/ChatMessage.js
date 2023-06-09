import { Image } from "react-bootstrap";

function ChatMessage(props) {
  const { avatar, message, side } = props;
  // pt={8} pl={2} pb={2}
  const styles = {
    chatBox: { display: "flex", alignItems: "center", position: "relative", paddingTop: "32px", paddingBottom: "8px" },
    container: { maxWidth: "80%" },
    avatar: { background: "#88EBEE", position: "absolute", top: "8px", height: "48px", width: "48px", borderRadius: "50%" },
    messageBox: { borderRadius: "10px", background: "white", boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.2)" },
    message: { fontSize: "14px", overflowWrap: "break-word" },
  };

  return side === "left" ? (
    <div style={{ ...styles.chatBox, justifyContent: "flex-start", paddingLeft: "8px" }}>
      <div style={styles.container}>
        {avatar && <Image src={avatar} style={{ ...styles.avatar, left: 0 }} />}
        <div style={{ ...styles.messageBox, padding: "12px 24px 12px 48px" }}>
          <p style={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ ...styles.chatBox, justifyContent: "flex-end", paddingRight: "8px" }}>
      <div style={styles.container}>
        {avatar && <Image src={avatar} style={{ ...styles.avatar, right: 0 }} />}
        <div style={{ ...styles.messageBox, padding: "12px 48px 12px 24px" }}>
          <p style={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
