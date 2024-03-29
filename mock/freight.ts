// import Mock from 'mockjs';

// const freightsList = [];
// let freightObj = {};
// const count = 100;

// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

// for (let i = 0; i < count; i++) {
//   freightsList.push(Mock.mock({
//     id: '@increment',
//     etaWh: String(+Mock.Random.date('T')),
//     ataWh: String(+Mock.Random.date('T')),
//     etaDp: String(+Mock.Random.date('T')),
//     pickup: String(+Mock.Random.date('T')),
//     'number|1': ['LOT-80', 'LOT-79', 'CA-16', 'EU-18', 'AGL-8'],
//     targetId: '@integer(1, 18)',
//     content: {
//       'board55_v1':'@integer(0, 40)',
//       'stand55_v1':'@integer(0, 40)',
//       'board75_pro':'@integer(0, 40)'
//     },
//     'status|1': ['Picked Up', 'In Transit', 'Delivered', 'Cancelled'],
//   }));
// }

// freightObj = Mock.mock({
//   id: '@increment',
//   'destination|1': ['LOT-80', 'LOT-79', 'CA-16', 'EU-18', 'AGL-8'],
//   'number|1': ['LOT-80', 'LOT-79', 'CA-16', 'EU-18', 'AGL-8'],
//   etaWh: String(+Mock.Random.date('T')),
//   ataWh: String(+Mock.Random.date('T')),
//   ataDp: String(+Mock.Random.date('T')),
//   etaDp: String(+Mock.Random.date('T')),
//   etdOp: String(+Mock.Random.date('T')),
//   atdOp: String(+Mock.Random.date('T')),
//   pickup: String(+Mock.Random.date('T')),
//   'targetId|1': ['LOT-80', 'LOT-79', 'CA-16', 'EU-18', 'AGL-8'],
//   'status|1': ['Picked Up', 'In Transit', 'Delivered', 'Cancelled'],
//   'mode|1': ['Air', 'Ocean', 'Truck'],
//   'oriPort|1': ['FBA-US', 'FBA-CA', 'FBA-DE', 'FBA-UK', 'FBA-JP', 'IWIN', 'RED STAG', 'VIBE BEL', 'FPL-CA', 'FPL-AU', 'TOYOND', 'TCL', 'SF (Fuqing)', 'Jiguang', 'HH', 'Zhongao', 'TPV', 'Customer'],
//   'destPort|1': ['FBA-US', 'FBA-CA', 'FBA-DE', 'FBA-UK', 'FBA-JP', 'IWIN', 'RED STAG', 'VIBE BEL', 'FPL-CA', 'FPL-AU', 'TOYOND', 'TCL', 'SF (Fuqing)', 'Jiguang', 'HH', 'Zhongao', 'TPV', 'Customer'],
//   'container|1': ['20GP', '40GP', '40HQ', '45HQ', 'LCL'],
//   cost: '@float(0, 100, 2, 2)',
//   'oceanForwarder|1': ['Full Power Logistics', 'FLEXPORT', 'LIGHTNING', 'AGL', 'SF'],
//   // 'freight_products|1-5': [
//   //   {
//   //     'sku|1': ['V55N201W', 'V55N203W', 'V55N205W', 'V55N203WR', 'V55N205WR', 'V55N201EU', 'V55N203EU', 'V55N205EU', 'V55N203EUR', 'V55N205EUR', 'V55N201W'],
//   //     'quantity': '@integer(1, 40)',
//   //     'purchase_cost'
//   //   },
//   // ],
//   content: {
//     'board55_v1':'@integer(0, 40)',
//     'stand55_v1':'@integer(0, 40)',
//     'board75_pro':'@integer(0, 40)'
//   },
// });

// export default [
//   // mock get all routes form server
//   {
//     url: RegExp('/api/mock/freights/[0-9]+'),
//     method: 'get',
//     response: config => {
//       return {
//         code: 20000,
//         data: freightObj
//       };
//     }
//   },
//   {
//     url: RegExp('/api/mock/freights/[0-9]+'),
//     method: 'put',
//     response: config => {
//       freightObj = config.body;
//       return {
//         code: 20000,
//         data: freightObj
//       };
//     }
//   },
//   {
//     url: RegExp('/api/mock/freights/[0-9]+'),
//     method: 'delete',
//     response: config => {
//       return {
//         code: 20000,
//         data: freightObj
//       };
//     }
//   },
//   {
//     url: '/api/mock/freights/',
//     method: 'post',
//     response: config => {
//       console.log('post config: ', config);
//       freightsList.push(config.body);
//       return {
//         code: 20000,
//         data: config.body
//       };
//     }
//   },
//   {
//     url: '/api/mock/freights',
//     method: 'get',
//     response: config => {
//       const { content, type, title, page = 1, limit = 20, sort } = config.query;

//       let mockList = freightsList.filter(item => {
//         if (content && item?.content !== content) return false;
//         if (type && item?.type !== type) return false;
//         if (title && item?.title.indexOf(title) < 0) return false;
//         return true;
//       });

//       if (sort === '-id') {
//         mockList = mockList.reverse();
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       };
//     }
//   },
// ];
