// import type {
//   ApiResponse,
//   ApiResponsePagination,
// } from '@/types'
// import {
//   deleteRequest,
//   getRequest,
//   postRequest,
//   putRequest
// } from '@/composables/apiRequest'

// export const getDeliveryMethodList = async (
//   ...args: any
// ): Promise<ApiResponse<ApiResponsePagination<DeliveryMethod[]>> | undefined> =>
//   await getRequest<ApiResponsePagination<DeliveryMethod[]>>(
//     'deliveryMethod/list',
//     ...args
//   )
//
// export const getDeliveryMethod = async (
//   id: string
// ): Promise<ApiResponse<DeliveryMethod> | undefined> =>
//   await getRequest<DeliveryMethod>('deliveryMethod/description', { id })
//
// export const addDeliveryMethod = async (
//   deliveryMethod: DeliveryMethod
// ): Promise<ApiResponse<any> | undefined> =>
//   await postRequest('deliveryMethod/add', deliveryMethod)
//
// export const editDeliveryMethod = async (
//   deliveryMethod: DeliveryMethod
// ): Promise<ApiResponse<any> | undefined> =>
//   await putRequest('deliveryMethod/edit', deliveryMethod)
//
// export const deleteDeliveryMethod = async (
//   idArray: number[] | string[]
// ): Promise<ApiResponse<any> | undefined> =>
//   await deleteRequest('deliveryMethod/delete', { id: idArray })
