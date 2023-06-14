import { useState } from 'react'
import './App.css'

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"


export function Chat() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Arnold, your personal AI Art Assistant.",
      sender: "ChatGPT" 
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    });

    const systemMessage = {
      role: "system",
      content: "answer all user questions like you are an art history professor or run a museum and know everything about paintings and artists",
    }
    
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        ...apiMessages // [message1, message2, etc]
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_CHATGPT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div
      className="Chat"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        backgroundColor: "white",
      }}
    >
      <div style={{ justifyContent: "center", height: "600px", width: "900px" }}>
        <MainContainer className="parent-chat-container">
          <ChatContainer className="child-chat-container">
            <MessageList
              className="message-list"
              style={{ backgroundColor: "white", paddingTop: "5px" }}
              typingIndicator={typing ? <TypingIndicator content="Arnold is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here..." onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chat
