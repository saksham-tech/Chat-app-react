import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { getSocket } from "../../socket";
import { AddDirectMessage } from "../../redux/slices/conversation";
import Message from "./Message";
const Conversation = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket(); // ✅ safe socket access

    if (!socket) return;

    const handleIncomingMessage = ({ message, conversation_id }) => {
      dispatch(AddDirectMessage({ conversation_id, message }));
    };

    socket.on("new_message", handleIncomingMessage);

    return () => {
      socket.off("new_message", handleIncomingMessage);
    };
  }, [dispatch]);

  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor:
          theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        minHeight: "100vh",
        flexGrow: 1,
      }}
    >
      <Header />
      <Box
        width={"100%"}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Message menu= {true} />
      </Box>
      <Footer />
    </Stack>
  );
};

export default Conversation;
