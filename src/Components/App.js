import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Chat";
import Login from "./Login";

const endpoint = 'http://localhost:3001/'
const socket = socketIOClient(endpoint);

const App = () => {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const [messages, setMessages] = useState([]);
  const [roomStatus, setRoomStatus] = useState({});


  useEffect(() => {
    document.title = 'Mafia Bros'
  }, []);

  useEffect(() => {
    socket.on('new_message', data => {
      setMessages([...messages, data]);
    });
    socket.on('room_status', data => {
      setRoomStatus(data);
    });
  });

  const handleLogin = (e) =>{
    e.preventDefault()
    if(userName && roomName) {
      setFormComplete(true);
      socket.emit('login', { userName, roomName });
      console.log(socket.id);
    }
  }

  const handleLeaveRoom = (e) =>{
    e.preventDefault()
    socket.emit('leave_room', { userName, roomName });
    setFormComplete(false);
    setMessages([]);
  }

  const submitNewMessage = (message) => {
    const msg = `${userName}: ${message}`
    socket.emit('new_message', message);
    setMessages([...messages, msg]);
  }

  return (
  <div id='app' className="app">
    <div className="app-header">Mafia Bros</div>
    <div className="app-body">
    {!formComplete &&
    <Login userName={userName} setUserName={setUserName} roomName={roomName} setRoomName={setRoomName} handleLogin={handleLogin} />}
    {formComplete && 
      <Chat roomStatus={roomStatus} userName={userName} messages={messages} submitNewMessage={submitNewMessage} handleLeaveRoom={handleLeaveRoom} />}
    </div>
  </div>
  )
}

export default App;
