/* eslint-disable new-cap */
<template>
  <div class="captcha-wrap">
    <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
    <div
      id="captcha-dom"
      class="nc-container"
    />
  </div>
</template>

<script>

import './captcha.js';
export default {
  name: 'Captcha',
  emits: ['sliderValidation'],
  setup(props, context) {
    onMounted(() => {
      const nc_token = [
        'FFFF0N00000000009931',
        new Date().getTime(),
        Math.random(),
      ].join(':'); // 没有做任何的响应
      const NC_Opt = {
        renderTo: '#captcha-dom',
        appkey: 'FFFF0N00000000009931',
        scene: 'nc_login',
        token: nc_token,
        customWidth: 300,
        trans: { key1: 'code0' },
        elementID: ['usernameID'],
        is_Opt: 0,
        language: 'en',
        isEnabled: true,
        timeout: 3000,
        times: 5,
        apimap: {
          // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
          // 'get_captcha': '//b.com/get_captcha/ver3',
          // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
          // 'get_img': '//c.com/get_img',
          // 'checkcode': '//d.com/captcha/checkcode.jsonp',
          // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
          // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
          // 'umid_serUrl': 'https://g.com/service/um.json'
        },
        callback: function (data) {
          data.csessionid && context.emit('sliderValidation');
        },
      };
      // eslint-disable-next-line new-cap,no-undef
      const nc = new noCaptcha(NC_Opt);
      // nc.upLang('en', {
      //   _startTEXT: 'Please drag the slider to the far right',
      //   _yesTEXT: 'Success',
      //   _error300:
      //     'Oops, error, click<a href="javascript:__nc.reset()">refresh</a>once again',
      //   _errorNetwork:
      //     'The network is down, please <a href="javascript:__nc.reset()">click to refresh</a>',
      // });
    });
  },
};
</script>
<style lang="sass">
.captcha-wrap
  .nc-container .nc_scale span
    height: auto
  .nc-container .nc_scale .btn_ok
    line-height: 32px
</style>
