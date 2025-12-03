import { createAsyncThunk } from "@reduxjs/toolkit";
import {type Message } from "../slices/messageSlice";
import { deleteChatMessage, fetchChatMessages, sendMessageToUser, updateChatMessage } from "@/services/messageServices";
import type { AxiosError } from "axios";

export const fetchMessages = createAsyncThunk(
    "message/fetchMessages",
      async (chatId: string, { rejectWithValue }) => {
        try {
          const data = await fetchChatMessages(chatId);
          return data.messages as Message[]
        } catch (err) {
         const error = err as AxiosError<{ message?: string }>;
         return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
      }
    }
)

export const sendMessage = createAsyncThunk(
    "message/sendMessage",
      async ({ chatId, content }: { chatId: string; content: FormData }, { rejectWithValue }) => {
        try {
          const data = await sendMessageToUser(chatId, content)
          return data.messageData
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
        }
      }
)


export const updateMessage = createAsyncThunk(
    "message/updateMessage",
      async ({ messageId, body }: { messageId: string; body: string }, { rejectWithValue }) => {
        try {
          const data = await updateChatMessage(messageId, body)
          return data.messageData
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
        }
      }
)


export const deleteMessage = createAsyncThunk(
    "message/deleteMessage",
    async({messageId}: {messageId: string}, {rejectWithValue}) => {
        try {
            const data = await deleteChatMessage(messageId)
            return data.messageData
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
        }
    }
)