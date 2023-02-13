<script lang="ts" setup>
import type { TableValue } from '@/types'
import { type PropType, reactive } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment-jalaali'
import { getFallbackImage } from '@/composables'

import KsButton from '@/components/ui/KsButton.vue'
import KsCheckBox from '@/components/ui/form/KsCheckBox.vue'
import { KsIcon } from '@ksCoreUi'
import { Colors } from '@/assets/colors'

const props = defineProps({
  tHeads: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  tValues: {
    type: Array as PropType<TableValue[]>,
    required: true
  },
  tData: {
    type: Array as PropType<any[]>,
    required: true
  },
  updateRouteName: {
    type: String,
    default: ''
  },
  updateRouteQueries: {
    type: Object as PropType<any>,
    default: null
  },
  isAllItemsSelected: Boolean,
  hasNode: {
    type: Boolean,
    default: false
  },
  nodePropName: {
    type: String,
    default: ''
  },
  nodeColeSpan: {
    type: Number,
    default: null
  },
  selectedItems: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  nodeParentId: {
    type: Number,
    default: null
  },
  hasDeleteBtn: {
    type: Boolean,
    default: true
  },
  hasEditBtn: {
    type: Boolean,
    default: true
  },
  hasCheckBox: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'deleteItem',
  'toggleSelectedItems',
  'toggleAllSelectedItems',
  'openImagePreviewModal',
  'onEditBtnClick'
])

const router = useRouter()
const apiBaseUrl = import.meta.env.VITE_API_URL

moment.loadPersian({ dialect: 'persian-modern' })

const state = reactive({
  singleSelectedItem: null as number | null,
  nodesVisibility: [] as number[]
})

function toggleNodeVisibility(index: number) {
  for (let i = 0; i < state.nodesVisibility.length; i++)
    if (state.nodesVisibility[i] === index) {
      state.nodesVisibility.splice(i, 1)
      return
    }
  state.nodesVisibility.push(index)
}

function abbreviateNumber(number: number) {
  const SiSymbols = ['', 'K', 'M', 'G', 'T', 'P', 'E']

  const tier = (Math.log10(Math.abs(number)) / 3) | 0

  if (tier === 0) return number

  const suffix = SiSymbols[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = number / scale

  return scaled.toFixed(1) + suffix
}

function getDateJalali(date: string) {
  return moment(date, 'YYYY-MM-DD').format('dddd jDD jMMMM jYYYY')
}

const onEditBtnClick = (id: string | number) => {
  if (props.updateRouteName)
    router.push({
      name: props.updateRouteName,
      params: { id },
      query: props.updateRouteQueries
    })
  emits('onEditBtnClick', id)
}
</script>

<template>
  <div class="min-w-0">
    <div
      :class="{ 'parent-table': tHeads.length }"
      class="ks-table table-responsive unselectable-text">
      <table class="table table-borderless IRANYekan">
        <thead
          v-if="tHeads.length"
          class="table-th-background fw-bold text-xSmall">
          <tr class="border-0">
            <th v-if="hasNode" scope="col" style="width: 24px">
              <KsIcon
                name="angle-left"
                :color="Colors.primaryLight"
                size="12" />
            </th>
            <th
              v-if="hasCheckBox"
              :class="{ 'has-node': hasNode }"
              class="checkbox-col"
              scope="col">
              <KsCheckBox
                :model-value="isAllItemsSelected"
                color="primary"
                custom-handle-change
                @change="$emit('toggleAllSelectedItems')" />
            </th>
            <th
              v-for="(head, index) in tHeads"
              :key="index + 'head'"
              scope="col"
              style="min-width: 200px">
              {{ head }}
            </th>
            <th
              class="text-center actions-column"
              scope="col"
              style="width: 1px">
              عملیات
            </th>
          </tr>
        </thead>
        <transition-group
          v-for="(data, index) in tData"
          :key="index + 'data'"
          :class="{ 'has-hover': tHeads.length }"
          :duration="200"
          class="text-small"
          name="fade"
          tag="tbody">
          <tr :key="index" class="align-middle">
            <td
              v-if="hasNode"
              class="cursor-pointer"
              style="width: 24px"
              @click="data[nodePropName].length && toggleNodeVisibility(index)">
              <KsIcon
                v-if="data[nodePropName].length"
                :class="{ 'angle-down': state.nodesVisibility.includes(index) }"
                :color="Colors.primaryLight"
                name="angle-left"
                size="12" />
              <KsIcon
                v-else
                name="minus"
                :color="Colors.primaryLight"
                size="8" />
            </td>
            <td
              v-if="hasCheckBox"
              :class="{ 'has-node': hasNode }"
              class="checkbox-col">
              <KsCheckBox
                :model-value="selectedItems.includes(data.id)"
                color="primary"
                custom-handle-change
                @change="
                  val =>
                    $emit('toggleSelectedItems', {
                      item: data,
                      status: val,
                      parentId: nodeParentId
                    })
                " />
            </td>
            <td
              v-for="(value, indexVal) in tValues"
              :key="indexVal + 'val'"
              :class="{ 'text-center': value.textCenter }"
              :style="value.maxWidth && 'max-width:' + value.maxWidth + 'px'"
              class="text-xSmall">
              <!--        IMAGE MODE         -->
              <button
                v-if="value.type === 'image'"
                class="bg-transparent border-0"
                @click="
                  $emit(
                    'openImagePreviewModal',
                    apiBaseUrl +
                      '/storage/' +
                      (value.subPropName
                        ? data[value.propName][value.subPropName]
                        : data[value.propName])
                  )
                ">
                <img
                  :src="
                    data[value.propName] &&
                    apiBaseUrl +
                      '/storage/' +
                      (value.subPropName
                        ? data[value.propName][value.subPropName]
                        : data[value.propName])
                  "
                  @error="getFallbackImage"
                  alt=""
                  class="img-fluid"
                  style="width: 52px; height: 52px; object-fit: contain" />
              </button>

              <!--        STATUS MODE         -->
              <div v-if="value.type === 'status'">
                <div
                  v-for="(status, indexStatus) in value.status"
                  :key="indexStatus + 'status'"
                  class="d-flex">
                  <KsButton
                    v-if="data[value.propName] === status.value"
                    :color="status.color"
                    :title="status.title"
                    custom-padding="2px 8px"
                    size="mini"
                    theme="flat" />
                </div>
              </div>

              <!--        TEXT MODE        -->
              <span v-if="value.type === 'text'">
                {{ data[value.propName] }}
              </span>

              <!--        PRICE MODE        -->
              <span v-if="value.type === 'price'" class="fw-bold">
                {{ data[value.propName].toLocaleString('ar-SA') }}
              </span>

              <!--        SI-NUM MODE        -->
              <span v-if="value.type === 'si-number'" class="fw-bold">
                {{ abbreviateNumber(data[value.propName]) }}
              </span>

              <!--        DATE MODE        -->
              <span v-if="value.type === 'date'">
                {{
                  data[value.propName]
                    ? getDateJalali(data[value.propName])
                    : ''
                }}
              </span>
            </td>
            <td class="actions-column">
              <div class="d-flex justify-content-end gap-2">
                <slot
                  :row-data="data"
                  :row-index="index"
                  name="custom-action-btn"></slot>
                <KsButton
                  v-if="hasEditBtn"
                  color="dark"
                  fixed-width-height="42"
                  tooltip="ویرایش"
                  @click="onEditBtnClick(data.id)">
                  <template #content>
                    <KsIcon
                      name="pencil"
                      :color="Colors.white"
                      size="14"
                      theme="light" />
                  </template>
                </KsButton>
                <KsButton
                  v-if="hasDeleteBtn"
                  color="danger"
                  fixed-width-height="42"
                  tooltip="حذف"
                  @click="$emit('deleteItem', data.id)">
                  <template #content>
                    <KsIcon
                      name="trash"
                      :color="Colors.white"
                      size="14"
                      theme="light" />
                  </template>
                </KsButton>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              hasNode &&
              data[nodePropName].length &&
              state.nodesVisibility.includes(index)
            ">
            <td :colspan="nodeColeSpan">
              <KsTable
                :node-cole-span="nodeColeSpan"
                :node-parent-id="data.id"
                :node-prop-name="nodePropName"
                :selected-items="selectedItems"
                :t-data="data[nodePropName]"
                :t-values="tValues"
                :update-route-name="updateRouteName"
                :update-route-queries="updateRouteQueries"
                has-node
                @deleteItem="val => emits('deleteItem', val)"
                @onEditBtnClick="emits('onEditBtnClick')"
                @openImagePreviewModal="
                  val => emits('openImagePreviewModal', val)
                "
                @toggleSelectedItems="
                  val => emits('toggleSelectedItems', val)
                " />
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-responsive {
  &.parent-table {
    border: {
      top-left-radius: 16px;
      top-right-radius: 16px;
    }

    & > .table {
      & > :not(caption) > * > * {
        padding: 12px 16px !important;
      }
    }
  }

  .has-hover > tr:hover > td:not(.actions-column) {
    background-color: rgba(var(--black), 0.04);
  }

  .table {
    & > :not(caption) > * > * {
      padding-left: 0 !important;
    }

    .checkbox-col {
      width: 32px;
      padding-left: 4px !important;

      &.has-node {
        padding-right: 4px !important;
      }
    }

    .actions-column {
      position: sticky;
      left: 0;
    }

    th {
      &.actions-column {
        background-color: rgb(var(--table-th-background));
      }
    }

    td {
      &.actions-column {
        background-color: rgb(var(--background-color));
      }
    }
  }
}
</style>
