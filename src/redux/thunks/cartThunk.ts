import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCourseToCart, getCartItems, removeCourseFromCart } from "@/services/cartServices";
import { addCourseToWishlist } from "@/services/wishlistServices";
import type { AxiosError } from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartItems();
      return data.cart.courses
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to fetch cart items");
        }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const data = await addCourseToCart(courseId);
      return data.cart.courses
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
        }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      await removeCourseFromCart(courseId);
      return courseId;
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
        }
  }
);

export const moveToWishlist = createAsyncThunk(
    "cart/moveToWishlist",
    async(courseId:string, {rejectWithValue}) => {
        try {
            await addCourseToWishlist(courseId)
            await removeCourseFromCart(courseId)
            return courseId
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
        }
    }
)