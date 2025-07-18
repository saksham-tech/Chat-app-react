import { io } from "socket.io-client";
import { store } from "./redux/store"; // ✅ Make sure the path is correct
import { incrementUnreadCount } from "./redux/slices/conversation"; // ✅ Adjust path if needed

let socket = null;
let isSocketConnected = false;

const connectSocket = (user_id) => {
  socket = io("http://localhost:3000", {
    query: { user_id },
  });

  socket.on("connect", () => {
    isSocketConnected = true;
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    isSocketConnected = false;
    console.warn("⚠️ Socket disconnected");
  });

  // ✅ UNREAD MESSAGE LISTENER
  // ✅ UNREAD MESSAGE LISTENER
socket.on("increment_unread", ({ room_id }) => {
  const state = store.getState();
  const currentRoomId = state.conversation.current_conversation?._id;

  // ✅ Only increment if chat is not currently open
  if (!currentRoomId || currentRoomId !== room_id) {
    const timestamp = new Date().toISOString();
    store.dispatch(incrementUnreadCount(room_id, timestamp));
  }
});



};

const getSocket = () => socket;
const isConnected = () => isSocketConnected;

export { socket, connectSocket, getSocket, isConnected };
