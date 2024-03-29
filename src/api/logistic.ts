/**
 * API 统一放在该文件，按数据库表名的首字母排序，及同级modules文件下对应的文件顺序
 */

import { ElMessage } from 'element-plus';
import requester from './http';
// import { resItemData, resItemsData, loginForm } from './type';


const handleReqElMsg = (fn, action: string, name: string, identifier?) => {
  return new Promise((resolve, reject) => {
    let item = null;
    const isCreation = action === 'Create';
    fn
      .then((data) => {
        item = data?.item || data;
        resolve(item);
        ElMessage.success(`${action} ${name} (ID: ${isCreation ? item.id : identifier}) successfully.`);
      })
      .catch((err: any) => {
        ElMessage.error(`${action} ${name} ${isCreation ? '' : identifier } failed.`);
        reject(err);
      });
  });
};

const jsonClone = (obj: object) :any => JSON.parse(JSON.stringify(obj));

/* 海运 Freight API */
export async function queryFreightsAPI (params?) {
  const res = await requester.get('freights', {
    params,
  });
  return res;
}
export async function createFreightAPI (data) {
  const item = handleReqElMsg(
    requester.post('freights', data), 'Create', 'Freight'
  );
  return item;
}
export async function findFreightAPI (freightId: number) {
  const { item } = await requester.get(`freight/${freightId}`);
  return item;
}
export async function updateFreightAPI (freightId: number, updates) {
  const item = handleReqElMsg(
    requester.put(`freight/${freightId}`, updates), 'Update', 'Freight', freightId
  );
  return item;
}
export async function deleteFreightAPI (freightId: number) {
  handleReqElMsg(
    requester.delete(`freight/${freightId}`), 'Delete', 'Freight', freightId
  );
}

/* 批次 Batch API */
export async function listBatchesAPI (freightId: number) {
  const { items } = await requester.get(`freight/${freightId}/batches`);
  return items;
}
export async function createBatchAPI (freightId: number, data) {
  const item = handleReqElMsg(
    requester.post(`freight/${freightId}/batches`, data), 'Create', 'Sub-Batch'
  );
  return item;
}
export async function updateBatchAPI (batchId: number, updates) {
  const item = handleReqElMsg(
    requester.put(`batch/${batchId}`, updates), 'Update', 'Sub-Batch', batchId
  );
  return item;
}
export async function deleteBatchAPI (batchId: number) {
  handleReqElMsg(
    requester.delete(`batch/${batchId}`), 'Delete', 'Sub-Batch', batchId
  );
}

/* 订单 Order API */
export async function queryOrdersAPI (params?) {
  const res = await requester.get('orders/raw', {
    params,
  });
  return res;
}
export async function updateOrderAttachment (orderId, attachment) {
  handleReqElMsg(
    requester.put(`/orders/raw/${orderId}/attachment`, attachment), 'Update', 'Order Attachment', orderId
  );
}
export async function queryAssignedOrdersAPI (params?) {
  const res = await requester.get('orders/assigned', {
    params,
  });
  return res;
}
export async function queryAssignedBatchOrdersAPI (orderIdArr: Array<number>) {
  const orderIdStr = orderIdArr.join(',');
  const { items } = await requester.get('/orders/assigned/batch/' + orderIdStr);
  return items;
}
export async function findAssignedOrderAPI (orderId: number) {
  const { item } = await requester.get(`orders/assigned/${orderId}`);
  return item;
}
export async function assignOrdersAPI (sourceId: number, orderArr: Array<number>) {
  const item = handleReqElMsg(
    requester.post('orders/assign', {
      assigned_to: sourceId,
      raw_orders: orderArr,
    }), 'Assign', 'Order', orderArr
  );
  return item;
}
export async function unassignOrdersAPI (orderId: number) {
  handleReqElMsg(
    requester.delete(`orders/assigned/${orderId}`), 'Unassign', 'Order', orderId
  );
}


/* 仓库 Warehouse API */
export async function listWarehousesAPI (params?) {
  const { items } = await requester.get('warehouses', {
    params,
  });
  return items;
}

/* 仓库 Warehouse Tasks API */
export async function queryTasksAPI (params?) {
  const res = await requester.get('/warehouse/tasks', {
    params,
  });
  return res;
}
export async function createTaskAPI (data) {
  const item = handleReqElMsg(
    requester.post('/warehouse/tasks', data), 'Create', 'Warehouse task'
  );
  return item;
}
export async function findTaskAPI (taskId: number) {
  const { item } = await requester.get(`/warehouse/task/${taskId}`);
  return item;
}
export async function updateTaskAPI (taskId: number, updates, params?) {
  const data = jsonClone(updates);
  delete data['packages'];

  const item = handleReqElMsg(
    requester.put(`/warehouse/task/${taskId}`, data, { params }), 'Update', 'Warehouse Task', taskId
  );
  return item;
}
export async function deleteTaskAPI (taskId: number) {
  handleReqElMsg(
    requester.delete(`/warehouse/task/${taskId}`), 'Delete', 'Warehouse Task', taskId
  );
}
export async function createShipmentUnitsAPI (taskId: number, data) {
  const item = handleReqElMsg(
    requester.post(`/warehouse/task/${taskId}/units`, data), 'Create', 'Package'
  );
  return item;
}
export async function findTaskFileAPI(taskId: number, fileId: number) {
  const res = await requester.get(`/warehouse/task/${taskId}/file/${fileId}`);
  return res;
}
export async function createTaskFileAPI(taskId: number, data) {
  const res = handleReqElMsg(
    requester.post(`/warehouse/task/${taskId}/files`, data), 'Create', 'File for Task', taskId
  );
  return res;
}
export async function deleteTaskFileAPI (taskId: number, fileId: number) {
  handleReqElMsg(
    requester.delete(`/warehouse/task/${taskId}/file/${fileId}`), 'Delete', 'Task PDF File', fileId
  );
}

// task 相关send email API
export async function sendEmailAPI (taskId: number) {
  const item = handleReqElMsg(
    requester.post(`warehouse/task/${taskId}/send-email`), 'Send', 'Email', 'no'
  );
  return item;
}

export async function syncLightningAPI (taskId: number) {
  const item = handleReqElMsg(
    requester.post(`warehouse/task/${taskId}/sync-lightning`), 'Sync', 'Lightning', 'no'
  );
  return item;
}

/* 批次 Shipment Package API */
export async function queryPackagesAPI (params?) {
  const res = await requester.get('/warehouse/packages', {
    params,
  });
  return res;
}
export async function findPackageAPI(packageId: number) {
  const { item } = await requester.get(`/warehouse/package/${packageId}`);
  return item;
}
export async function createPackageAPI (taskId: number, data) {
  const packageData = packageCleanUp(data);
  const item = handleReqElMsg(
    requester.post(`/warehouse/task/${taskId}/packages`, packageData), 'Create', 'Package'
  );
  return item;
}
export async function listTaskPackagesAPI (taskId: number) {
  const { items } = await requester.get(`/warehouse/task/${taskId}/packages`);
  return items;
}

function removeEmptyAccessories (units) {
  units.forEach((unit, idx, arr) => {
    delete arr[idx]['item']; // 删除无用字段
    if (!unit.accessories?.length)
      delete arr[idx]['accessories'];
  });
}

function packageCleanUp (packageItem) {
  const temp = jsonClone(packageItem);
  for (let idx = temp.units.length - 1; idx >= 0; idx--) {
    delete temp.units[idx]['item'];
    delete temp.units[idx]['hasError'];
    if (!temp.units[idx].serial)
      temp.units.splice(idx, 1);
  }
  for (let idx = temp.accessories.length - 1; idx >= 0; idx--) {
    if (!temp.accessories[idx].productCode)
      temp.accessories.splice(idx, 1);
  }
  removeEmptyAccessories(temp.units);
  return temp;
}

export async function updatePackageAPI (packageId: number, updates) {
  const data = packageCleanUp(updates);
  delete data['task'];
  delete data['taskId'];

  const item = handleReqElMsg(
    requester.put(`/warehouse/package/${packageId}`, data), 'Update', 'Package', packageId
  );
  return item;
}
export async function deletePackageAPI (packageId: number) {
  handleReqElMsg(
    requester.delete(`/warehouse/package/${packageId}`), 'Delete', 'Package', packageId
  );
}

/* Warehousing API */
export async function updatePackageUnitAPI(packageId: number, unitId: number, updates) {
  const data = jsonClone(updates);
  delete data['item'];
  const item = handleReqElMsg(
    requester.put(`/warehouse/package/${packageId}/unit/${unitId}`, data), 'Update', 'Package Unit', unitId
  );
  return item;
}

/* 单个商品 Unit API */
export async function queryUnitsAPI (params?) {
  const res = await requester.get('/units/search', { params });
  return res.items;
}
export async function updateUnitAPI (unitSerial: string, updates) {
  const item = handleReqElMsg(
    requester.put(`unit/${unitSerial}`, updates), 'Update', 'Unit', unitSerial
  );
  return item;
}
export async function listUnitsAPI (serialsArr: Array<string>) {
  const serialsStr = serialsArr.join(',');
  const res = await requester.get('/units/batch/' + serialsStr);
  return res.items;
}

/* 库存 Inventory API */
export async function listInventoriesAPI (params?) {
  const { data } = await requester.get('/mock/inventories', {
    params,
  });
  return data;
}

/* 用户配置 profile API 登录注册登出 */
export async function loginAPI(formInfo) {
  let res = null;
  await requester.post('/login', formInfo)
    .then((data) => {
      res = data;
      ElMessage.success('Welcome to Vibe Logisitc System.');
    })
    .catch(() => ElMessage.error('Wrong username or password.'));
  return res;
}

export async function getInfoAPI() {
  const res = await requester.get('/me');
  return res;
}

// export async function logoutAPI() {
//   await mockRequester.post('/user/logout')
//     .then(() => ElMessage.success('Log out successfully.'))
//     .catch(() => ElMessage.error('Log out failed, please contact developer.'));
// }

