<script lang="ts" setup>
import type { FilterQuery, ListCustomGetParam, TableValue } from '@/types'
import { computed, onMounted, type PropType, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFallbackImage } from '@/composables'
import axios from 'axios'
import showSuccessNotification from '@/composables/showSuccessNotification'
import showErrorNotification from '@/composables/showErrorNotification'
import showWarnNotification from '@/composables/showWarnNotification'

import KsTable from '@/components/ui/KsTable.vue'
import KsInput from '@/components/ui/form/KsInput.vue'
import KsSelect from '@/components/ui/form/KsSelect.vue'
import KsButton from '@/components/ui/KsButton.vue'
import KsModal from '@/components/ui/KsModal.vue'
import KsSkeletonLoading from '@/components/ui/KsSkeletonLoading.vue'
import KsPagination from '@/components/ui/KsPagination.vue'
import KsDatePicker from '@/components/ui/form/KsDatePicker.vue'
import NoDataVector from '@/assets/img/NoDataVector.vue'
import { KsIcon } from '@ksCoreUi'
import { PageHeader } from './_common'
import { Colors } from '@/assets/colors'

const apiBaseUrl = import.meta.env.VITE_API_URL

const router = useRouter()
const route = useRoute()

const props = defineProps({
  listTitle: {
    type: String,
    required: true
  },
  tableHeads: {
    type: Array as PropType<string[]>,
    required: true
  },
  tableValues: {
    type: Array as PropType<TableValue[]>,
    required: true
  },
  tableData: {
    type: Array,
    default: () => []
  },
  totalReq: {
    type: Number,
    default: null
  },
  customHandleFetch: {
    type: Boolean,
    default: false
  },
  customFetchLoading: {
    type: Boolean,
    default: false
  },
  apiFetchUrl: {
    type: String,
    default: null
  },
  apiDeleteUrl: {
    type: String,
    default: null
  },
  updateRouteName: {
    type: String,
    default: null
  },
  updateRouteQueries: {
    type: Object as PropType<any>,
    default: null
  },
  hasNode: {
    type: Boolean,
    default: false
  },
  nodePropName: {
    type: String,
    default: null
  },
  subHasActions: {
    type: Boolean,
    default: true
  },
  subPropName: {
    type: String,
    default: null
  },
  filterQueries: {
    type: Array as PropType<FilterQuery[]>,
    default: null
  },
  customGetParams: {
    type: Array as PropType<ListCustomGetParam[]>,
    default: () => []
  },
  apiHasPagination: {
    type: Boolean,
    default: true
  },
  searchTerms: {
    type: String,
    default: ''
  },
  reFetchData: {
    type: Boolean,
    default: false
  },
  hasBackBtn: {
    type: Boolean,
    default: false
  },
  hasDeleteBtn: {
    type: Boolean,
    default: true
  },
  hasEditBtn: {
    type: Boolean,
    default: true
  },
  hasAddBtn: {
    type: Boolean,
    default: true
  },
  hasDeleteAllBtn: {
    type: Boolean,
    default: true
  },
  hasCheckBox: {
    type: Boolean,
    default: true
  },
  hasPagination: {
    type: Boolean,
    default: true
  },
  hasSearch: {
    type: Boolean,
    default: true
  },
  hasEntryQnt: {
    type: Boolean,
    default: true
  },
  listIcon: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['fetchRequested', 'onAddBtnClick', 'onEditBtnClick'])

watch(
  () => props.reFetchData,
  () => {
    if (!props.reFetchData) return
    fetchData(false)
  }
)

const entriesQntOptions: { title: string; val: number }[] = [
  { title: '25', val: 25 },
  { title: '50', val: 50 },
  { title: '100', val: 100 },
  { title: '200', val: 200 },
  { title: 'همه', val: 0 }
]

const state = reactive({
  fetchedData: [] as any[],
  searchQuery: '',
  isAllChecked: false,
  tempEntriesQnt: 25,
  entriesQnt: 25,
  filterQueries: [] as FilterQuery[],
  tempFilterQueries: [] as FilterQuery[],
  activePage: 1,
  totalReq: 0,
  isLoading: !props.customHandleFetch,
  deleteModalVisible: false,
  filterModalVisible: false,
  selectedItems: [] as any[],
  deletingItems: [] as any[],
  imagePreviewModalVisible: false,
  modalImagePreviewSrc: null
} as any)

// ITEMS SELECTION
const isAllItemsSelected = computed(() => {
  for (let i = 0; i < state.fetchedData.length; i++)
    if (!state.selectedItems.includes(state.fetchedData[i].id)) return false
  return true
})

function addItemsSelection(item: any) {
  if (!state.selectedItems.includes(item.id)) state.selectedItems.push(item.id)
  if (item[props.nodePropName] && item[props.nodePropName].length)
    for (let i = 0; i < item[props.nodePropName].length; i++)
      addItemsSelection(item[props.nodePropName][i])
}

function removeItemsSelection(item: any, parentId: number | null = null) {
  if (parentId)
    for (let i = 0; i < state.selectedItems.length; i++)
      if (state.selectedItems[i] === parentId) state.selectedItems.splice(i, 1)

  const itemIndex = state.selectedItems.indexOf(item.id)
  state.selectedItems.splice(itemIndex, 1)

  if (item[props.nodePropName] && item[props.nodePropName].length)
    for (let i = 0; i < item[props.nodePropName].length; i++)
      removeItemsSelection(item[props.nodePropName][i])
}

function toggleItemSelection(data: {
  item: unknown
  status: boolean
  parentId: number
}) {
  if (data.status) addItemsSelection(data.item)
  else removeItemsSelection(data.item, data.parentId)
}

function toggleAllItemsSelection() {
  if (isAllItemsSelected.value) state.selectedItems = []
  else
    for (let i = 0; i < state.fetchedData.length; i++)
      addItemsSelection(state.fetchedData[i])
}

// ITEMS SELECTION
const pageLength = computed(() => {
  return state.entriesQnt ? Math.ceil(state.totalReq / state.entriesQnt) : 1
})

const filteredTerms = computed(() => {
  let terms: {
    propName: string
    val: number | string
  }[] = []
  if (state.filterQueries)
    for (let i = 0; i < state.filterQueries.length; i++) {
      if (state.filterQueries[i].selected)
        terms.push({
          propName: state.filterQueries[i].propName,
          val: state.filterQueries[i].selected
        })
    }
  return terms
})

function removeFilters() {
  state.filterModalVisible = false
  for (let i = 0; i < state.filterQueries.length; i++) {
    state.filterQueries[i].selected = ''
    state.tempFilterQueries[i].selected = ''
  }
  onNewFilters()
}

watch(
  () => state.filterModalVisible,
  () => {
    if (!state.filterModalVisible) onCancelFilters()
  }
)

watch(
  () => props.tableData,
  () => {
    if (props.customHandleFetch) {
      state.fetchedData = props.tableData
      state.totalReq = props.totalReq
    }
  },
  {
    deep: true,
    immediate: true
  }
)

function onDeleteButton(singleSelectedItem: any) {
  state.deletingItems = []
  if (singleSelectedItem) state.deletingItems.push(singleSelectedItem)
  else if (state.selectedItems.length) state.deletingItems = state.selectedItems
  else {
    showWarnNotification('آیتمی برای حذف انتخاب نشده است')
    return
  }
  state.deleteModalVisible = true
}

const deleteItems = async () => {
  await axios
    .delete(apiBaseUrl + props.apiDeleteUrl, {
      data: {
        id: state.deletingItems
      }
    })
    .then(response => {
      const isSuccess = response.data.code === 200
      if (isSuccess) {
        showSuccessNotification(response.data.description)
        if (props.customHandleFetch) emit('fetchRequested')
        else
          fetchData(false).then(() => {
            if (state.fetchedData.length <= 0)
              if (state.activePage >= 1) {
                state.activePage -= 1
                if (props.customHandleFetch) emit('fetchRequested')
                else fetchData(false)
              }
          })
        state.selectedItems = []
        state.deletingItems = []
      } else showErrorNotification(response.data.description)
    })
    .catch(e => {
      showErrorNotification(e)
      console.log(e)
    })

  state.deleteModalVisible = false
}

async function fetchData(resetActivePage: boolean) {
  if (resetActivePage) state.activePage = 1

  state.filterModalVisible && (state.filterModalVisible = false)

  let rows = state.entriesQnt

  let formParams: any = {
    rows,
    page: state.activePage,
    search: state.searchQuery
  }

  if (props.customGetParams.length)
    for (let i = 0; i < props.customGetParams.length; i++)
      formParams[props.customGetParams[i].propName] =
        props.customGetParams[i].value

  if (filteredTerms.value.length)
    for (let i = 0; i < filteredTerms.value.length; i++)
      formParams[filteredTerms.value[i].propName] = filteredTerms.value[i].val

  if (!props.customHandleFetch) {
    state.isLoading = true

    await axios
      .get(apiBaseUrl + props.apiFetchUrl, {
        params: formParams,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          if (props.apiHasPagination) {
            state.fetchedData = response.data.data.data
            state.totalReq = response.data.data.total
          } else state.fetchedData = response.data.data
        } else showErrorNotification(response.data.description)
      })
      .catch(e => {
        showErrorNotification(e.response.data.message || e.error)
        console.log(e)
      })
    state.isLoading = false
  } else {
    emit('fetchRequested', formParams)
  }
}

function onEntriesQntOptionClick(data: { title: number; val: number }) {
  state.tempEntriesQnt = data.title
  state.entriesQnt = data.val
  handleUrlQueries(true, false)
}

function onEntriesQntSubmit(val: string) {
  if (val) {
    let qnt
    if (val === 'همه') qnt = 0
    else qnt = parseInt(val)

    if (qnt || qnt === 0) {
      state.entriesQnt = qnt
      handleUrlQueries(true, false)
    } else showWarnNotification('مقدار وارد شده برای تعداد نمایش باید عدد باشد')
  }
}

function onCancelFilters() {
  state.tempFilterQueries = []
  bindFilterQueries('tempFilterQueries', state.filterQueries)
  state.filterModalVisible = false
}

function onNewFilters() {
  let query: any = {
    PageSize: state.entriesQnt,
    PageNumber: state.activePage
  }
  for (let i = 0; i < state.tempFilterQueries.length; i++) {
    state.filterQueries = state.tempFilterQueries
    query[state.tempFilterQueries[i].propName] =
      state.tempFilterQueries[i].selected
  }

  router.replace({ name: route.name?.toString(), query })
  fetchData(true)
}

function handleUrlQueries(resetPage: boolean, checkForUrl: boolean) {
  let query: any = {
    PageSize: state.entriesQnt,
    PageNumber: state.activePage,
    search: state.searchQuery
  }

  if (checkForUrl) {
    const params = query

    Object.keys(route.query).forEach(queryKey => {
      Object.assign(params, {
        [queryKey]: route.query[queryKey].toString()
      })
    })

    if (params.PageSize) query.PageSize = parseInt(params.PageSize)
    if (params.PageNumber) query.PageNumber = parseInt(params.PageNumber)
    if (params.search) query.search = params.search

    if (query.PageSize) {
      state.tempEntriesQnt = query.PageSize
      state.entriesQnt = query.PageSize
    }
    if (query.PageNumber) state.activePage = query.PageNumber
    if (query.search) state.searchQuery = query.search

    if (state.filterQueries) {
      const paramsNameList = Object.keys(params)
      for (let i = 0; i < state.filterQueries.length; i++) {
        let queryOnUrl = null
        for (let j = 0; j < paramsNameList.length; j++)
          if (
            paramsNameList[j] === state.filterQueries[i].propName &&
            params[paramsNameList[j]]
          ) {
            queryOnUrl = params[paramsNameList[j]]
            state.filterQueries[i].selected =
              state.filterQueries[i].type === 'select'
                ? parseInt(queryOnUrl)
                : queryOnUrl
          }

        query[state.filterQueries[i].propName] = queryOnUrl ? queryOnUrl : ''
      }
    }
    if (state.filterQueries)
      bindFilterQueries('tempFilterQueries', state.filterQueries)
  }

  router.replace({ name: route.name?.toString(), query })
  fetchData(resetPage)
}

function bindFilterQueries(propName: string, data: FilterQuery[]) {
  for (let i = 0; i < data.length; i++) {
    state[propName].push({
      title: data[i].title,
      propName: data[i].propName,
      values: data[i].values,
      type: data[i].type,
      selected: data[i].selected
    })
  }
}

function openImagePreviewModal(src: string) {
  state.modalImagePreviewSrc = src
  state.imagePreviewModalVisible = true
}

const onAddBtnClick = () => {
  if (props.updateRouteName)
    router.push({
      name: props.updateRouteName,
      query: props.updateRouteQueries
    })

  emit('onAddBtnClick')
}

onMounted(() => {
  if (props.filterQueries)
    bindFilterQueries('filterQueries', props.filterQueries)

  handleUrlQueries(false, true)
})
</script>

<template>
  <div class="background-color p-3 shadow-sm rounded-3 text-end">
    <KsButton
      v-if="hasAddBtn"
      class="floating-btn d-sm-none"
      fixed-width-height="44"
      radius="circle"
      @click="onAddBtnClick">
      <template #content>
        <KsIcon name="plus" color="#ffffff" size="18" />
      </template>
    </KsButton>

    <PageHeader
      :page-title="listTitle"
      :has-back-btn="hasBackBtn"
      :has-add-btn="hasAddBtn"
      :page-icon="listIcon"
      @onAddBtnClick="onAddBtnClick" />

    <div
      v-if="hasSearch || filterQueries || hasEntryQnt"
      class="d-flex flex-column flex-lg-row gap-3 gap-lg-5 justify-content-between my-4 align-items-lg-center"
      dir="rtl">
      <div class="rtl flex-1 d-sm-flex align-items-center gap-1" dir="rtl">
        <KsInput
          v-if="hasSearch"
          v-model="state.searchQuery"
          :placeholder="'جستجو بر اساس ' + searchTerms + '...'"
          class="flex-fill"
          custom-height="42"
          icon="right"
          type="text"
          @blur="handleUrlQueries(true, false)">
          <template #icon>
            <KsIcon name="search" :color="Colors.primary" size="16" />
          </template>
        </KsInput>

        <div v-if="filterQueries">
          <div class="d-flex mt-2 mt-sm-0 align-items-center">
            <KsButton
              :active="filteredTerms.length > 0"
              class="p-1 flex-fill"
              color="dark"
              theme="flat"
              @click="state.filterModalVisible = true">
              <template #content>
                <span class="text-xSmall">
                  فیلتر
                  <span v-if="filteredTerms.length > 0" style="font-size: 10px">
                    (فعال)
                  </span>
                </span>
              </template>
            </KsButton>
            <transition name="fade">
              <KsButton
                v-if="filteredTerms.length"
                color="dark"
                fixed-width-height="40"
                theme="flat"
                @click="removeFilters">
                <template #content>
                  <KsIcon name="times" :color="Colors.primary" size="14" />
                </template>
              </KsButton>
            </transition>
          </div>
        </div>
      </div>
      <div
        v-if="hasEntryQnt"
        class="flex-shrink-1 d-flex align-items-center justify-content-end flex-row-reverse gap-2 mt-3 mt-sm-0 text-small">
        <KsSelect
          v-model="state.tempEntriesQnt"
          :options="entriesQntOptions"
          class="flex-fill"
          label-prop-name="title"
          mode="search"
          placeholder="تعداد نمایش"
          submit-btn
          value-prop-name="val"
          @onOptionClick="data => onEntriesQntOptionClick(data)"
          @onSubmitClick="onEntriesQntSubmit" />
        <span class="fw-light" style="width: 80px"> تعداد نمایش: </span>
      </div>
    </div>

    <hr class="opacity-30" />

    <transition-group mode="out-in" name="fade">
      <div
        v-if="
          !state.isLoading && !customFetchLoading && state.fetchedData.length
        "
        key="KsTable"
        class="mt-4 rtl"
        dir="rtl">
        <KsTable
          :has-check-box="hasCheckBox"
          :has-delete-btn="hasDeleteBtn"
          :has-edit-btn="hasEditBtn"
          :has-node="hasNode"
          :is-all-items-selected="isAllItemsSelected"
          :node-cole-span="tableHeads.length + 3"
          :node-prop-name="nodePropName"
          :selected-items="state.selectedItems"
          :t-data="state.fetchedData"
          :t-heads="tableHeads"
          :t-values="tableValues"
          :update-route-name="updateRouteName"
          :update-route-queries="updateRouteQueries"
          @deleteItem="onDeleteButton"
          @onEditBtnClick="val => emit('onEditBtnClick', val)"
          @openImagePreviewModal="openImagePreviewModal"
          @toggleAllSelectedItems="toggleAllItemsSelection"
          @toggleSelectedItems="toggleItemSelection">
          <template #custom-action-btn="slotProps">
            <slot
              :row-data="slotProps.rowData"
              :row-index="slotProps.rowIndex"
              name="custom-action-btn"></slot>
          </template>
        </KsTable>
        <div v-if="hasDeleteAllBtn" class="d-flex justify-content-end mt-3">
          <transition mode="in-out" name="fade">
            <KsButton
              v-if="state.selectedItems.length"
              color="danger"
              theme="flat"
              @click="onDeleteButton(null)">
              <template #content>
                <div class="d-flex gap-2 align-items-center">
                  <KsIcon name="trash" :color="Colors.danger" size="13" />
                  <span class="color-danger">حذف موارد انتخابی</span>
                </div>
              </template>
            </KsButton>
          </transition>
        </div>
      </div>

      <div
        key="KsSkeletonLoader"
        :class="{ 'w-100 vh-100': state.isLoading || customFetchLoading }"
        class="position-relative">
        <KsSkeletonLoading
          v-if="state.isLoading || customFetchLoading"
          class="list-loader" />
      </div>

      <!--    PAGINATION   -->
      <KsPagination
        v-if="hasPagination && state.fetchedData.length"
        key="KsPagination"
        v-model="state.activePage"
        :length="pageLength"
        class="mt-3"
        @onChange="handleUrlQueries(false, false)" />

      <!--    NO DATA FOUND   -->
      <div
        v-if="
          !state.isLoading && !customFetchLoading && !state.fetchedData.length
        "
        key="NoDataComponent"
        class="py-5 d-flex flex-column justify-content-center align-items-center">
        <NoDataVector style="width: 18%" />
        <span class="fw-bold color-primary text-medium mt-4">
          ...داده ای یافت نشد
        </span>
        <span class="color-primary-light text-small mt-2">
          شما میتوانید با زدن دکمه افزودن جدید آیتم تازه ای اضافه کنید
        </span>
      </div>
    </transition-group>

    <!--    MODALS    -->
    <!--    FILTER MODAL    -->
    <KsModal v-model="state.filterModalVisible" blur prevent-close>
      <div class="text-center pt-2">
        <span class="fw-bold text-large"> جستجو پیشرفته </span>
      </div>

      <div class="d-flex flex-column rtl my-4" dir="rtl">
        <KsInput
          v-model="state.searchQuery"
          :placeholder="'جستجو بر اساس ' + searchTerms + '...'"
          type="text">
        </KsInput>

        <span class="text-xSmall mt-4 me-2">فیلتر بر اساس: </span>

        <div
          v-for="(filterQuery, index) in state.tempFilterQueries"
          :key="index + 'filterQuery'"
          class="flex-fill mt-3"
          dir="rtl">
          <KsDatePicker
            v-if="filterQuery.type === 'date'"
            v-model="filterQuery.selected"
            :color="Colors.primary"
            :element-tag="filterQuery.propName"
            :placeholder="filterQuery.title" />
          <KsSelect
            v-if="filterQuery.type === 'select'"
            v-model="filterQuery.selected"
            :options="filterQuery.values"
            :placeholder="filterQuery.title"
            label-prop-name="title"
            remove-btn
            value-prop-name="value"
            @onOptionClick="option => (filterQuery.selected = option.value)"
            @removeBtnClick="filterQuery.selected = ''" />
        </div>
      </div>
      <div class="d-flex gap-2 mt-3">
        <KsButton
          color="primary"
          theme="flat"
          title="اعمال فیلتر"
          @click="onNewFilters" />
        <KsButton
          color="transparent"
          title="لغو"
          @click="state.filterModalVisible = false" />
      </div>
    </KsModal>

    <!--    DELETE MODAL   -->
    <KsModal v-model="state.deleteModalVisible" blur>
      <div class="text-center pt-2">
        <span class="color-danger fw-bold text-large"> هشدار </span>
      </div>

      <div class="text-center my-3" dir="rtl">
        <span class="text-small">
          از حذف آیتم
          {{ state.deletingItems.length > 1 ? 'های' : '' }}
          انتخاب شده مطمعن هستید؟
        </span>
      </div>

      <div class="d-flex gap-2 mt-3">
        <KsButton
          color="danger"
          theme="flat"
          title="تایید"
          @click="deleteItems" />
        <KsButton
          color="transparent"
          title="لغو"
          @click="state.deleteModalVisible = false" />
      </div>
    </KsModal>

    <!--    IMAGE PREVIEW MODAL    -->
    <KsModal v-model="state.imagePreviewModalVisible" blur no-padding>
      <div class="d-flex justify-content-center">
        <img
          :src="state.modalImagePreviewSrc"
          alt=""
          class="img-fluid"
          @error="getFallbackImage" />
      </div>
    </KsModal>
  </div>
</template>

<style lang="scss" scoped>
.list-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
