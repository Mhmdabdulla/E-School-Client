import type { ModuleData } from "@/types/module"
import apiClient from "@/lib/axios"

export const createModule = async(data:ModuleData) => {

      const response = await apiClient.post("/modules", data, {withCredentials:true})
      return response

  }
  
  export const updateModule = async (moduleId:string, data: Partial<ModuleData>) => {

      const res = await apiClient.put(`/modules/${moduleId}`, data)
      return res.data

  }
  
  export const deleteModule = async (moduleId:string) => {

      const res = await apiClient.delete(`/modules/${moduleId}`)
      console.log(res.data)
      return res.data
 
  }