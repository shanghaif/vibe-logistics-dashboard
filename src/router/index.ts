import { createRouter, createWebHashHistory } from 'vue-router';
import { cssShowRouter } from './modules/css-show';
import { logisticRouter } from './modules/logistic';
import { vibeToolRouter } from './modules/vibe-tool';
// import store from '../store';
/* Layout */
import Layout from '@/layout/Index.vue';


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'sidebar-svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  ...cssShowRouter,
  ...logisticRouter,
  ...vibeToolRouter,
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/logistic/order',
    children: [
      {
        path: 'dashboard/index',
        component: () => import('@/views/Dashboard/Index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'sidebar-dashboard', affix: true }
      }
    ]
  },
  {
    path: '/ui',
    component: Layout,
    hidden: true,
    redirect: '/ui/refactor',
    children: [
      {
        path: 'refactor',
        component: () => import('@/views/Dashboard/UiRefactor.vue'),
        name: 'UiRefactor',
        meta: { title: 'Ui Refactor', icon: 'sidebar-dashboard' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/Redirect.vue'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/Auth-Redirect.vue'),
  //   hidden: true
  // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'sidebar-permission',
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/Role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Manage Role',
          icon: 'sidebar-role',
          roles: ['ADMIN', 'VIBE_MANAGER', 'VIBE_OPERATOR']
        }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
});

export default router;
