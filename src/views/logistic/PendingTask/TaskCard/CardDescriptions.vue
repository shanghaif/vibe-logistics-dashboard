<template>
  <el-descriptions
    v-if="task?.id"
    :column="3"
    direction="vertical"
    border
  >
    <el-descriptions-item label="Order ID">
      {{ orderEnum[task.orderId]?.id }}
      <template
        v-for="order in orderEnum[task.orderId]?.rawOrders"
        :key="order?.id"
      >
        <el-tag size="small">
          {{ order?.id }}
        </el-tag>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="Task ID & Type">
      {{ task.id }}
      <el-tag>{{ task.taskType }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Task On-Hold">
      On Hold:
      <el-select
        v-model="task.onHold"
        :class="!notHighPermission && 'top-z-index'"
        placeholder="Please select"
        clearable
        @change="onTaskChange"
      >
        <el-option
          v-for="(ifHold, key) in onHoldEnum"
          :key="key"
          :label="key"
          :value="ifHold"
        />
      </el-select>
      <br>
      <span v-if="task.onHold">
        Scheduled fulfillment date:
        <span :class="!notHighPermission && 'top-z-index'">
          <el-date-picker
            v-model="task.scheduledDate"
            :disabled="notHighPermission"
            type="date"
            placeholder="Please pick a date"
            value-format="YYYY-MM-DD"
            @change="onTaskChange"
          />
        </span>
      </span>
    </el-descriptions-item>
    <el-descriptions-item
      width="30%"
      label="Create Date"
    >
      {{ formatVBDate(task.createdAt) }}
    </el-descriptions-item>
    <el-descriptions-item
      width="30%"
      label="Fulfilled Date"
    >
      <span v-if="task.fulfilledAt">
        {{ formatVBDate(task.fulfilledAt) }}
      </span>
      <span v-else></span>
    </el-descriptions-item>
    <el-descriptions-item
      label="Status & Action"
      width="40%"
    >
      <el-tooltip
        v-if="tasksProductFulQty[task.id]?.error"
        effect="light"
      >
        <el-button
          type="danger"
          size="default"
        >
          Incomplete
        </el-button>
        <template #content>
          <el-tag
            size="large"
            type="danger"
            style="font-size: 14px"
          >
            {{ tasksProductFulQty[task.id]?.error }}
          </el-tag>
        </template>
      </el-tooltip>
      <el-button
        v-if="!tasksProductFulQty[task.id]?.error"
        type="primary"
      >
        Complete
      </el-button>
      <el-button
        :type="task.fulfilledAt ? 'warning' : 'success'"
        :disabled="!!tasksProductFulQty[task.id]?.error"
        @click="updateTaskFulfillTime"
      >
        {{ task.fulfilledAt ? 'Fulfilled' : 'Fulfill' }}
      </el-button>
      <el-button
        type="success"
        :disabled="!isFulfilled || !orderEnum[task.orderId]?.email"
        @click="sendEmailAPI(task.id)"
      >
        Send Email
      </el-button>
      <el-button
        v-if="warehouseEnum[task.sourceId] === 'Lightning'"
        type="success"
        :disabled="notHighPermission"
        @click="syncLightning(task.id)"
      >
        Sync Lightning
      </el-button>
    </el-descriptions-item>
    <el-descriptions-item label="Transport & Carrier">
      {{ transportEnum[task.transportMode] }}
      <el-select
        v-if="task.transportMode"
        v-model="task.carrier"
        placeholder="Please select"
        clearable
        @change="onTaskChange"
      >
        <el-option
          v-for="(item, key) in transportCarrierEnum[task.transportMode]"
          :key="item"
          :label="item"
          :value="key"
        />
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="Shipment Info">
      <OrderShipmentInfo :order-item="orderEnum[task.orderId] || {}" />
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          Note
          <el-button
            :type="isEditTaskNote ? 'success' : 'primary'"
            @click="editTaskNote"
          >
            {{ isEditTaskNote ? 'save' : 'edit' }}
          </el-button>
        </div>
      </template>
      <el-input
        v-model="task.note"
        type="textarea"
        :autosize="{ minRows: 4 }"
        :disabled="!isEditTaskNote"
      />
      <div
        v-if="task.files.length"
        class="download-file-list"
      >
        <strong>Files:</strong>
        <template
          v-for="file in task.files"
          :key="file.fileId"
        >
          <div>
            <el-tag
              class="cursor-pointer mgb-5"
              @click="downloadFile(file)"
            >
              {{ file.fileName }}
            </el-tag>
          </div>
        </template>
        <el-button
          type="primary"
          @click="downloadTaskFiles(task.files)"
        >
          Download {{ task.files.length }} Task Shipping Labels
        </el-button>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import OrderShipmentInfo from '../../components/OrderShipmentInfo.vue';
import { transportEnum, transportCarrierEnum, onHoldEnum } from '@/enums/logistic';
import { updateTaskAPI, sendEmailAPI, syncLightningAPI, findTaskFileAPI } from '@/api';
import { formatVBDate } from '@/utils/logistic';

const props = defineProps({
  taskIdx: {
    type: Number,
    required: true
  },
  orderEnum: {
    type: Object,
    default: () => {}
  },
  warehouseEnum: {
    type: Object,
    default: () => {}
  },
  role: {
    type: String,
    required: true
  }
});

const notHighPermission = computed(() => !['ADMIN', 'VIBE_MANAGER'].includes(props.role));

const isFulfilled = ref(false);
const isEditTaskNote = ref(false);

const tasksProductFulQty = inject('tasksProductFulQty');
const dataList = inject('dataList');

const task = ref(dataList.value[props.taskIdx]);

watch(
  () => dataList.value,
  () => {
    setTimeout(() => { // 防止task突变引起的undefined err
      task.value = dataList.value[props.taskIdx];
    }, 300);
  }
);


const emit = defineEmits(['fetchList']);
const fetchList = () => emit('fetchList');

const onTaskChange = () => {
  const taskItem = task.value;
  updateTaskAPI(taskItem.id, taskItem, { syncLightning: false }).then(() => emit('fetchList'));
};

const updateTaskFulfillTime = () => {
  const taskItem = task.value;
  taskItem.fulfilledAt = taskItem.fulfilledAt || new Date();
  updateTaskAPI(taskItem.id, taskItem, { syncLightning: false }).then(() => {
    isFulfilled.value = true;
  });
};

const editTaskNote = () => {
  if (isEditTaskNote.value) {
    const taskItem = task.value;
    updateTaskAPI(taskItem.id, taskItem, { syncLightning: false }).then(() => {
      isEditTaskNote.value = false;
      emit('fetchList');
    });
  } else {
    isEditTaskNote.value = true;
  }
};

const syncLightning = (taskId) => {
  syncLightningAPI(taskId).then(() => emit('fetchList'));
};

const downloadFile = file => {
  const taskId = file.fileName.split('#')[1];
  findTaskFileAPI(taskId, file.fileId).then(data => {
    window.open(data.downloadUrl);
  });
};

const downloadTaskFiles = (files) => {
  const promiseArr = [];
  files.forEach(file => {
    promiseArr.push(downloadFile(file));
  });
  Promise.allSettled(promiseArr);
};
</script>

<style lang="sass" scoped>
.cell-item
  display: flex
  justify-content: space-between
  align-items: center
.el-textarea
  display: block

.top-z-index
  position: relative
  z-index: 9999
</style>
