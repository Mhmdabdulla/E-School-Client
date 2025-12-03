import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserChats } from "@/services/chatServices";
import type { AxiosError } from "axios";

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
      async (_, { rejectWithValue }) => {
        try {
          const data = await fetchUserChats();
          return data.chats 
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to fetch chats");
        }
      }
)