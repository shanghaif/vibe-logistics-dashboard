<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path"
      >
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>


import { compile } from '@/utils/path-to-regexp.min';
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';

export default defineComponent({
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const data = reactive({
      levelList: null
    });

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter(item => item.meta?.title);
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched);
      }

      data.levelList = matched.filter(item => item.meta?.title && item.meta?.breadcrumb !== false);
    };

    const isDashboard = route => {
      const name = route?.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    };

    const pathCompile = path => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route;
      var toPath = compile(path);
      return toPath(params);
    };

    const handleLink = item => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    getBreadcrumb();

    watch( route, route => {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      getBreadcrumb();
    });

    return {
      ...toRefs(data),
      // methods
      handleLink
    };
  },
});
</script>

<style lang="sass" scoped>
.app-breadcrumb.el-breadcrumb
  display: inline-block
  font-size: 14px
  line-height: 50px
  margin-left: 8px
  .no-redirect
    color: #97a8be
    cursor: text
</style>
