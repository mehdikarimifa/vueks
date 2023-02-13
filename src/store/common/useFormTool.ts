import type { Loadings, UploadProgress, UploadStatusAlert } from '@/types'
import { LOADING_MODEL } from '@/models'
import { defineStore } from 'pinia'

export const useFormTool = defineStore('useFormTool', {
  state: () => {
    return {
      loadings: { ...LOADING_MODEL } as Loadings,
      uploadProgressList: [] as UploadProgress[],
      uploadStatusAlertList: [] as UploadStatusAlert[]
    }
  },
  actions: {
    toggleInputFieldsLoading(state: boolean) {
      this.loadings.inputFields = state
    },
    toggleSelectFieldsLoading(state: boolean) {
      this.loadings.selectFields = state
    },
    toggleListLoading(state: boolean) {
      this.loadings.list = state
    },
    toggleSubmitButtonLoading(state: boolean) {
      this.loadings.submitButton = state
    },
    addUploadProgress(data: UploadProgress) {
      this.uploadProgressList.push(data)
    },
    removeUploadProgress(index: number, id: string) {
      this.uploadProgressList.splice(
        this.uploadProgressList.findIndex(x => x.id === id && x.index === index),
        1
      )
    },
    addUploadStatusAlert(data: UploadStatusAlert) {
      const foundIndex = this.uploadStatusAlertList.findIndex(
        alert => alert.id === data.id && alert.index === data.index
      )
      if (foundIndex === -1) this.uploadStatusAlertList.push(data)
    },
    removeUploadStatusAlert(index: number, id: string) {
      this.uploadStatusAlertList.splice(
        this.uploadStatusAlertList.findIndex(
          x => x.id === id && x.index === index
        ),
        1
      )
    }
  },
  getters: {
    getUploadStatusAlertList: (state) => state.uploadStatusAlertList,
    inputFieldsLoading: (state) => state.loadings.inputFields,
    selectFieldsLoading: (state) => state.loadings.selectFields,
    listLoading: (state) => state.loadings.list,
    submitButtonLoading: (state) => state.loadings.submitButton,
    deleteButtonLoading: (state) => state.loadings.deleteButton
  }
})
