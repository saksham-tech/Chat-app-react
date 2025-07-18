import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
    unread_counts: {},
  },
  group_chat: {},
  user_profile: {
    name: "Default Name",
    about: "Available",
    img: "", // base64 or URL
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    updateProfile(state, action) {
      const updated = action.payload;
      const my_id = window.localStorage.getItem("user_id");

      // Update user_profile
      state.user_profile = {
        ...state.user_profile,
        ...updated,
      };

      // Also update this user in conversations list
      state.direct_chat.conversations = state.direct_chat.conversations.map((conv) =>
        String(conv.user_id) === String(my_id)
          ? {
              ...conv,
              name: updated.name,
              about: updated.about,
              img: updated.img,
            }
          : conv
      );
    },

    incrementUnreadCount(state, action) {
      const { room_id, time } = action.payload;
      const existing = state.direct_chat.unread_counts[room_id];

      if (existing && typeof existing === "object") {
        existing.count += 1;
        existing.time = time;
      } else {
        state.direct_chat.unread_counts[room_id] = {
          count: 1,
          time,
        };
      }
    },

    resetUnreadCount(state, action) {
      const room_id = action.payload;
      state.direct_chat.unread_counts[room_id] = { count: 0, time: null };
    },

    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (u) => u._id.toString() !== user_id
        );
        const lastMessage = el.messages?.at(-1);

        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          msg: lastMessage?.text || "",
          time: "9:36", // optionally format this later
          unread: 0,
          pinned: false,
          about: user?.about || "",
          img: user?.img || faker.image.avatar(),
        };
      });

      state.direct_chat.conversations = list;
    },

    updateDirectConversation(state, action) {
      const conversation = action.payload.conversation;
      const otherUser = conversation.participants.find(
        (u) => u._id.toString() !== user_id
      );

      state.direct_chat.conversations = state.direct_chat.conversations.map((c) =>
        c?.id === conversation._id
          ? {
              ...c,
              name: `${otherUser?.firstName} ${otherUser?.lastName}`,
              about: otherUser?.about || "",
              online: otherUser?.status === "Online",
              img: otherUser?.img || faker.image.avatar(),
              msg: faker.music.songName(),
            }
          : c
      );
    },

    addDirectConversation(state, action) {
      const conversation = action.payload.conversation;
      const user = conversation.participants.find(
        (u) => u._id.toString() !== user_id
      );

      // Remove any existing with same id
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (c) => c?.id !== conversation._id
      );

      state.direct_chat.conversations.push({
        id: conversation._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: user?.img || faker.image.avatar(),
        about: user?.about || "",
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },

    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted = messages.map((m) => ({
        id: m._id,
        type: "msg",
        subtype: m.type,
        message: m.text,
        incoming: m.to === user_id,
        outgoing: m.from === user_id,
      }));

      state.direct_chat.current_messages = formatted;
    },

    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    },
  },
});

export default slice.reducer;

// -------------------- ACTIONS --------------------

export const FetchDirectConversations =
  ({ conversations }) =>
  async (dispatch) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };

export const AddDirectConversation =
  ({ conversation }) =>
  async (dispatch) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };

export const UpdateDirectConversation =
  ({ conversation }) =>
  async (dispatch) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };

export const SetCurrentConversation =
  (current_conversation) =>
  async (dispatch) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };

export const FetchCurrentMessages =
  ({ messages }) =>
  async (dispatch) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };

export const AddDirectMessage =
  (message) =>
  async (dispatch) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };

export const incrementUnreadCount =
  (room_id, time = new Date().toISOString()) =>
  async (dispatch) => {
    dispatch(slice.actions.incrementUnreadCount({ room_id, time }));
  };

export const resetUnreadCount = (room_id) => async (dispatch) => {
  dispatch(slice.actions.resetUnreadCount(room_id));
};

export const updateProfile = (payload) => async (dispatch) => {
  dispatch(slice.actions.updateProfile(payload));
};
