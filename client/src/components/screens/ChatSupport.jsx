import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const res = await axios.post("/chat", { message });
      const botResponse = res.data.choices[0].message.content;
      setMessages([...newMessages, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "bot", content: "Error fetching response." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button variant="primary" className="chat-button" onClick={toggleChat}>
        <FontAwesomeIcon icon={faComments} size="lg" />
      </Button>

      {/* Chat Popup Window */}
      {isOpen && (
        <Card className="chat-popup">
          <Card.Header className="chat-header">
            <h6 className="mb-0">Support Assistant</h6>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={toggleChat}
            />
          </Card.Header>

          <Card.Body className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </Card.Body>

          <Card.Footer className="chat-footer">
            <InputGroup>
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button variant="primary" onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      )}

      {/* Custom Styles */}
      <style>{`
        /* Floating Chat Button */
        .chat-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        }

        /* Chat Popup Window */
        .chat-popup {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 350px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        /* Chat Header */
        .chat-header {
          background: #007bff;
          color: white;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
        }

        /* Close Button */
        .close-icon {
          cursor: pointer;
        }

        /* Chat Body */
        .chat-body {
          max-height: 300px;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
          background: #f8f9fa;
        }

        /* Chat Messages */
        .chat-message {
          padding: 8px 12px;
          margin: 5px;
          border-radius: 8px;
          max-width: 75%;
          font-size: 14px;
          text-align: left;
        }

        /* User Message */
        .user {
          align-self: flex-end;
          background: #007bff;
          color: white;
          border-radius: 10px 10px 0 10px;
        }

        /* Bot Message */
        .bot {
          align-self: flex-start;
          background: white;
          color: black;
          border: 1px solid #ddd;
          border-radius: 10px 10px 10px 0;
        }

        /* Chat Footer */
        .chat-footer {
          padding: 10px;
          background: white;
          border-top: 1px solid #ddd;
        }
      `}</style>
    </>
  );
};

export default ChatSupport;
