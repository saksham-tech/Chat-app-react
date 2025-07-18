import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import { getSocket } from "../../socket";
import { resetUnreadCount } from "../../redux/slices/conversation"; // ✅ Add at top

const Message = ({ menu, isMobile }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const listRef = useRef(null);
  const socket = getSocket();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);
  const myUserId = window.localStorage.getItem("user_id");

  const [isTypingUser, setIsTypingUser] = useState(false);

  // Load messages on chat open
 useEffect(() => {
  const current = conversations.find((c) => c?.id === room_id);
  if (!current) return;

  socket.emit("get_messages", { conversation_id: current.id }, (data) => {
    dispatch(FetchCurrentMessages({ messages: data }));
  });

  dispatch(SetCurrentConversation(current));

  // ✅ Reset unread count when conversation is opened
  dispatch(resetUnreadCount(room_id));
}, [conversations, room_id, dispatch, socket]);


  // Scroll to bottom when messages update
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [current_messages, isTypingUser]); // Add isTypingUser to scroll on typing indicator

  // Handle typing socket events
  useEffect(() => {
    socket.on("typing", ({ from, conversation_id }) => {
      if (from !== myUserId && conversation_id === room_id) {
        setIsTypingUser(true);
      }
    });

    socket.on("stop_typing", ({ from, conversation_id }) => {
      if (from !== myUserId && conversation_id === room_id) {
        setIsTypingUser(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [room_id, myUserId, socket]);

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background,
      }}
    >
      <Box
        ref={listRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          scrollBehavior: "smooth",
          p: isMobile ? 1 : 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack spacing={3}>
          {current_messages.map((el, idx) => {
            if (el.type === "divider") {
              return (
                <Box key={idx} sx={{ animation: "fadeUp 0.3s ease-in-out" }}>
                  <Timeline el={el} />
                </Box>
              );
            }

            if (el.type === "msg") {
              const subtype = el.subtype?.toLowerCase();
              let Component;
              switch (subtype) {
                case "img":
                  Component = MediaMsg;
                  break;
                case "doc":
                  Component = DocMsg;
                  break;
                case "link":
                  Component = LinkMsg;
                  break;
                case "reply":
                  Component = ReplyMsg;
                  break;
                default:
                  Component = TextMsg;
              }
              return (
                <Box key={idx} sx={{ animation: "fadeUp 0.3s ease-in-out" }}>
                  <Component el={el} menu={menu} />
                </Box>
              );
            }

            return null;
          })}

          {/* Typing indicator for receiver */}
          {isTypingUser && (
            <Box sx={{ animation: "fadeUp 0.3s ease-in-out" }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: theme.palette.mode === "light" ? "#e0f2fe" : "#1e293b",
                  color: theme.palette.mode === "light" ? "#0f172a" : "#e0f2fe",
                  borderRadius: "12px",
                  px: 2,
                  py: 1,
                  width: "fit-content",
                  fontSize: "14px",
                  fontStyle: "italic",
                }}
              >
                typing
                <span className="dot-one">.</span>
                <span className="dot-two">.</span>
                <span className="dot-three">.</span>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Add this CSS globally in your styles.css or App.css */}
      <style>
        {`
          .dot-one, .dot-two, .dot-three {
            animation: blink 1.4s infinite both;
            margin-left: 1px;
          }
          .dot-two {
            animation-delay: 0.2s;
          }
          .dot-three {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Message;
