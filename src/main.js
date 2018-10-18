// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Mint from 'mint-ui';
import layer from 'vue-layer';


Vue.use(Mint);

// Vue.prototype.$qs = qs

Vue.prototype.$layer = layer(Vue);

Vue.prototype.$layer = layer(Vue, {
    msgtime: 1,//目前只有一项，即msg方法的默认消失时间，单位：秒
});

import 'mint-ui/lib/style.css';


Vue.config.productionTip = false
Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
