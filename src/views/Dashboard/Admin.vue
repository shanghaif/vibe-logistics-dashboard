<template>
  <div class="dashboard-editor-container">
    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
    <div class="f-row">
      <pan-thumb :image="avatar">
        Your roles:
        <span class="pan-info-roles">{{ role }}</span>
      </pan-thumb>
      <div class="info-container">
        <span style="font-size:20px;">Admin's Dashboard</span>
      </div>
    </div>
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      />
    </el-row>
  </div>
</template>

<script setup>
import PanThumb from './components/PanThumb.vue';
import GithubCorner from './components/GithubCorner.vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const { avatar, role } = storeToRefs(userStore);
const emptyGif = ref('https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3');
</script>

<style lang="sass" scoped>
.dashboard-editor-container
  .pan-info-roles
    font-size: 14px
    font-weight: 700
    color: #333
    display: block
    
  .info-container
    position: relative
    margin-left: 50px
    width: 400px
    height: 150px
    line-height: 200px
    user-select: none
    .display-name
      font-size: 48px
      line-height: 48px
      color: #212121
      position: absolute
      top: 25px

  .github-corner
    position: absolute
    top: 0px
    border: 0
    right: 0

  .chart-wrapper
    background: #fff
    padding: 16px 16px 0
    margin-bottom: 32px
  


@media (max-width:1024px)
  .chart-wrapper
    padding: 8px
  

</style>
