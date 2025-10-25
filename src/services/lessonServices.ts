
import apiClient from "@/lib/axios"
import type { Lecture } from "@/types/module"

export const createLesson = async(data:FormData) => {

      return await apiClient.post("/lessons", data, {withCredentials: true})

  }
  
  export const updateLesson = async (lessonId: string, data: Partial<Lecture>) => {
 
      const res = await apiClient.put(`/lessons/${lessonId}`, data)
      return res.data

  }
  
  export const deleteLesson = async (lessonId: string) => {

      const res = await apiClient.delete(`/lessons/${lessonId}`)
      return res.data

  }