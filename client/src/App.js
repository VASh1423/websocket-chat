import React, { useRef, useState } from 'react';

import './App.css';
import ConnectForm from './ConnectForm/ConnectForm';
import MessageForm from './MessageForm/MessageForm';

function App() {
  const socket = useRef();
  const [username, setUsername] = useState()
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = (username) => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      const message = {
          event: 'connection',
          id: Date.now()
      }
      socket.current.send(JSON.stringify(message))

      setUsername(username)
      setIsConnected(true);
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
  }

  const sendMessage = (text) => {
    const message = {
      username,
      message: text,
      id: Date.now(),
      event: 'message'
    }
    socket.current.send(JSON.stringify(message));
  }

  return (
  <>
    <div className="wrapper">
      {
        isConnected 
        ? <MessageForm sendMessage={sendMessage}/>
        : <ConnectForm connect={connect}/>
      }
    </div>
    <div className="wrapper">
        <div>
          {messages.map(mess =>
            <div key={mess.id}>
              {mess.event === 'connection'
                ? <div className="connection_message">
                  Пользователь {mess.username} подключился
                </div>
                : <div className="message">
                  {mess.username}. {mess.message}
                </div>
              }
            </div>
          )}
        </div>
      </div>
  </>
  );
}

export default App;
