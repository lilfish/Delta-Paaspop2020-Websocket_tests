import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'


Vue.use({
  install() {
    Vue.prototype.destroy = Vue.prototype.$destroy;
  },
});
// Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  components: {
    App
  }
}).$mount('#app')