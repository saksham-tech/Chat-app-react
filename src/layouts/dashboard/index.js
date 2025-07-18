import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";

import {
  FetchUserProfile,
  SelectConversation,
  showSnackbar,
} from "../../redux/slices/app";

import {
  UpdateDirectConversation,
  AddDirectConversation,
  AddDirectMessage,
} from "../../redux/slices/conversation";

import Sidebar from "./Sidebar";
import { connectSocket, getSocket } from "../../socket"; // ✅ USE getSocket here

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();

  const { user_id, isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation?.direct_chat || {}
  );

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn || !user_id) return;

    connectSocket(user_id); // ✅ Always try to connect

    const interval = setInterval(() => {
      const socket = getSocket();
      if (socket && socket.connected) {
        console.log("✅ Socket ready. Registering listeners.");

        socket.on("new_message", (data) => {
          const message = data.message;
          if (current_conversation?.id === data.conversation_id) {
            dispatch(
              AddDirectMessage({
                id: message._id,
                type: "msg",
                subtype: message.type,
                message: message.text,
                incoming: message.to === user_id,
                outgoing: message.from === user_id,
              })
            );
          }
        });

        socket.on("start_chat", (data) => {
          const existing = conversations?.find((el) => el?.id === data._id);
          if (existing) {
            dispatch(UpdateDirectConversation({ conversation: data }));
          } else {
            dispatch(AddDirectConversation({ conversation: data }));
          }
          dispatch(SelectConversation({ room_id: data._id }));
        });

        socket.on("new_friend_request", () => {
          dispatch(showSnackbar({ severity: "success", message: "New friend request received" }));
        });

        socket.on("request_accepted", () => {
          dispatch(showSnackbar({ severity: "success", message: "Friend Request Accepted" }));
        });

        socket.on("request_sent", (data) => {
          dispatch(showSnackbar({ severity: "success", message: data.message }));
        });

        clearInterval(interval); // ✅ Stop checking once connected
      } else {
        console.warn("⏳ Waiting for socket to connect...");
      }
    }, 500); // check every 500ms

    return () => {
      const socket = getSocket();
      socket?.off("new_message");
      socket?.off("start_chat");
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
    };
  }, [isLoggedIn, user_id, current_conversation, conversations, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction="row">
      {isDesktop && <Sidebar />}
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
