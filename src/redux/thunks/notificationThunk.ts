import { deleteNotification, getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/services/notificationServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export const fetchNotificationsThunk = createAsyncThunk(
    "notification/fetchNotifications",
    async (_, { rejectWithValue }) => {
  try {
    const data = await getNotifications()
    return data.notifications as Notification []
} catch (err) {
         const error = err as AxiosError<{ message?: string }>;
         return rejectWithValue(error.response?.data?.message || "Failed to fetch ntofications");
      }
});

export const markAllNotificationsAsReadThunk = createAsyncThunk(
    "notification/markAllNotificationsAsRead",
    async(_, {rejectWithValue}) => {
        try {
             await markAllNotificationsAsRead()
            return true
} catch (err) {
         const error = err as AxiosError<{ message?: string }>;
         return rejectWithValue(error.response?.data?.message || "Fialed to mark all notifications as read");
      }
    }
)

export const markNotificationAsReadThunk = createAsyncThunk(
    "notification/markNotificationAsRead",
    async(notificationId: string, {rejectWithValue}) => {
        try {
            const data = await markNotificationAsRead(notificationId)
            return data.notification
} catch (err) {
         const error = err as AxiosError<{ message?: string }>;
         return rejectWithValue(error.response?.data?.message || "Failed to mark notification as read");
      }
    }
)

export const deleteNotificationThunk = createAsyncThunk(
    "notification/deleteNotification",
    async(notificationId: string, {rejectWithValue}) => {
        try {
            const data = await deleteNotification(notificationId)
            return data.notification._id
} catch (err) {
         const error = err as AxiosError<{ message?: string }>;
         return rejectWithValue(error.response?.data?.message || "Failed to delete notification");
      }
    }
)
