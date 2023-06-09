import ChatMessage from "./ChatMessage";

function ChatBoard(props) {
  const { chats } = props;
  return <div w="100%">{chats && chats.map((chat, index) => <ChatMessage key={index} side={chat.side} avatar={chat.avatar} message={chat.message} />)}</div>;
}

export default ChatBoard;
