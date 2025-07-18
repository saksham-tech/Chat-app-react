import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import { resetUnreadCount } from "../redux/slices/conversation";

const truncateText = (string, n) => {
  return string?.length > n ? `${string.slice(0, n)}...` : string;
};

const formatTime = (isoTime) => {
  if (!isoTime) return "";
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatElement = ({ avatar, name, about, msg, time, online, id }) => {
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);

  const unreadData = useSelector(
    (state) =>
      state.conversation.direct_chat.unread_counts[id] || { count: 0, time: null }
  );

  const unread = unreadData.count || 0;
  const unreadTime = unreadData.time;

  const isSelected = String(room_id) === String(id);
  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
        dispatch(resetUnreadCount(id));
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
        transition: "background-color 0.3s",
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={avatar} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={avatar} />
          )}

          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{name}</Typography>
            {about && (
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", color: "gray" }}
              >
                {truncateText(about, 40)}
              </Typography>
            )}
            {msg && (
              <Typography variant="caption" color="textSecondary">
                {truncateText(msg, 30)}
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack spacing={2} alignItems="center">
          {!isSelected && unread > 0 && unreadTime && (
            <Typography sx={{ fontWeight: 600 }} variant="caption">
              {formatTime(unreadTime)}
            </Typography>
          )}
          {!isSelected && unread > 0 && (
            <Badge
              className="unread-count"
              color="primary"
              badgeContent={unread}
            />
          )}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};


export default ChatElement;
