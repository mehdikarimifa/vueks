import axios, { type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types'
import showErrorNotification from '@/composables/showErrorNotification'

const apiUrl = import.meta.env.VITE_API_URL.toString()

const axiosInstance = axios.create({
  baseURL: apiUrl + '/api/'
})

export async function getRequest<T>(
  url: string,
  params: {
    [key: string]: string | number
  } | null = null
): Promise<ApiResponse<T> | undefined> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<never>>(url, {
      params
    })
    if (data.code !== 200) showErrorNotification(data.description)
    return data
  } catch (error) {
    showErrorNotification(error.message)
    return null
  }
}

export async function postRequest(
  url: string,
  requestData: any = null,
  config: AxiosRequestConfig = null
): Promise<ApiResponse<any> | undefined> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<any>>(
      url,
      requestData,
      config
    )
    if (data.code !== 200) showErrorNotification(data.description)
    return data
  } catch (error) {
    showErrorNotification(error.message)
    return null
  }
}

export async function putRequest(
  url: string,
  requestData: any = null,
  config: AxiosRequestConfig = null
): Promise<ApiResponse<any> | undefined> {
  try {
    const { data } = await axiosInstance.put<ApiResponse<any>>(
      url,
      requestData,
      config
    )
    if (data.code !== 200) showErrorNotification(data.description)
    return data
  } catch (error) {
    showErrorNotification(error.message)
    return null
  }
}

export async function deleteRequest(
  url: string,
  requestData: any = null
): Promise<ApiResponse<any> | undefined> {
  try {
    const { data } = await axiosInstance.delete<ApiResponse<any>>(url, {
      data: requestData
    })
    if (data.code !== 200) showErrorNotification(data.description)
    return data
  } catch (error) {
    showErrorNotification(error.message)
    return null
  }
}
