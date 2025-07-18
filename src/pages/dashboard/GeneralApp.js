import React, { useEffect } from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import Conversation from "../../components/Conversation";
import { useDispatch, useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { Link } from "react-router-dom";
import NoChat from "../../assets/Illustration/NoChat";
import { SelectConversation } from "../../redux/slices/app"; // ✅ make sure this path is correct

const GeneralApp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

  // ✅ Reset conversation when page loads or user logs in
  useEffect(() => {
    dispatch(SelectConversation({ room_id: null }));
  }, [dispatch]);

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
      {/* Chats Sidebar */}
      <Chats />

      {/* Middle Conversation */}
      <Box
        sx={{
          height: "100vh",
          width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        {chat_type === "individual" && !!room_id ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Contact Sidebar */}
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "SHARED":
              return <SharedMessages />;
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            default:
              return null;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
