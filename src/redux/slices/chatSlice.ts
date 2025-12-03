import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/chatThunk";
import {type IUser } from "../../types/user";
import {type Message } from "./messageSlice";

export interface Chat {
  _id: string;
  participants: string[] | Partial<IUser> [];
  lastMessage: Partial<Message>;
  updatedAt: Date;
  createdAt: Date
}

interface ChatState {
  chats: Chat[];
  onlineUsers: string [];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  onlineUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat(state, action) {
      state.chats.unshift(action.payload);
    },
    updateChat(state, action) {
      const newChatData = action.payload;
      const chatIdToUpdate = newChatData._id;
      const index = state.chats.findIndex(chat => chat._id === chatIdToUpdate);
      let updatedChat: Chat;
      if (index !== -1) {
        updatedChat = {
          ...state.chats[index],
          ...newChatData
        }
        
        state.chats.splice(index, 1);
      }else{
        updatedChat = newChatData as Chat
      }
      state.chats.unshift(updatedChat);
    },
    clearChat(state) {
      state.chats = []
      state.onlineUsers = []
    }
    ,
    updateOnlineUsers(state, action) {
        state.onlineUsers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch chats";
      });
  },
});

export const { addChat, updateChat, updateOnlineUsers, clearChat } = chatSlice.actions;
export default chatSlice.reducer;