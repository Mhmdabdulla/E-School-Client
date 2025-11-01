import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInstructorDetails } from "@/services/instructorServices";
import type { AxiosError } from "axios";

export const fetchInstructor = createAsyncThunk(
    'instructor/fetchInstructor',
    async (instructorId: string | undefined, {rejectWithValue})=>{
        try {
            const data = await getInstructorDetails(instructorId);
            return data.instructor;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
             return rejectWithValue(error.response?.data?.message || "failed to fetch instructor")
        }
    }
)