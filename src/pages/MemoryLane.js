import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function ChatList({ chats }) {
  return (
    <div className="border border-gray-300 rounded p-4 max-h-96 overflow-y-auto">
      <h1 className="mb-2 text-lg font-bold">Chats:</h1>
      <ul>
        {chats.map((chat, index) => (
          <li key={index} className="mb-2">
            <strong>{chat.userName}:</strong> {chat.message}
          </li>
        ))}
      </ul>
    </div>
  );
}


function MemoryLane() {
  //states
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [message, setMessage] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [sharedImage, setSharedImage] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const joinRoom = () => {
    if (!userName || !room) {
      alert("User Name and Room ID cannot be empty");
      return;
    }

    socket.emit("join_room", { room, userName });
    setJoinedRoom(true);
  };
  const generateRandomRoomId = () => {
    const randomId = Date.now() - Math.floor(Math.random() * 10000);
    setRoom(randomId.toString());
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message, room, userName });
      setMessage("");
    }
  };

  const sendImage = () => {
    if (imageLink) {
      socket.emit("send_image", { image: imageLink, room, userName });
      setSharedImage(imageLink);
      setImageLink("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      setChatHistory((prevChats) => [...prevChats, { userName: data.userName, message: data.message }]);
    });

    socket.on("receive_image", (data) => {
      setSharedImage(data.image);
      setChatHistory((prevChats) => [...prevChats, { userName: data.userName, message: data.image }]);
    });

    // Listen for updates to the list of users in the room
    socket.on("update_users", (data) => setUsersInRoom(data.users));

    return () => {
      // Clean up event listeners when component unmounts
      socket.off("receive_message");
      socket.off("receive_image");
      socket.off("update_users");
    };
  }, [socket]);

  return (
    <div>
      <div id="2">
      <form id="userinfo">
      <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="" required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User name</label>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={room} onChange={(event) => setRoom(event.target.value)} placeholder="" required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Room ID</label>
      </div>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={joinRoom}>Join Room</button>
      <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={generateRandomRoomId}>Create Room</button>
      </form>
      {
        joinedRoom &&(
          <>
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center" onClick={() => navigator.clipboard.writeText(room)}>
          <svg class="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
          <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
          </svg>
            Copy Room ID
          </button>
          <div>
          <ChatList chats={chatHistory} />
          <div>
          <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message..." value={message} onChange={(event) => setMessage(event.target.value)}/>
          <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={sendMessage}>Send</button>
          </div>
        </div></>
        )
      }
      </div>
      {joinedRoom &&(
        <div>
          <div id="2">
          <h1>Shared Image:</h1>
          {sharedImage && <img src={sharedImage} class="w-full h-auto max-w-xl rounded-lg" alt={`Shared by ${userName}`}/>} 
          <form class="flex items-center">   
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                      </svg>
                  </div>
                  <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={imageLink} onChange={(event) => setImageLink(event.target.value)} placeholder="Enter image Link......" required/>
                  <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3" onClick={sendImage}>
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                  </svg>
                  </button>
              </div>
          </form>
          </div>
          <div id="3">
          <div className="flex items-center space-x-2">
            <h1 className="mr-2">Users in Room:</h1>
            <ul className="flex">
              {usersInRoom.map((user, index) => (
                <li key={index} className="mr-2">{user}</li>
              ))}
            </ul>
          </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default MemoryLane;
