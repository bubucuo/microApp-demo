// import Vue from 'vue'
// import App from './App.vue'
//
// Vue.config.productionTip = false
//
// /**
//  * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
//  */
// export async function mount(props) {
//   console.log("props==",props)
//   // ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
// }
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
// import routes from './router';
// import store from './store';

Vue.config.productionTip = false;

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    // routes,
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
// const state = {testcc:'子应用'}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log("onGlobalStateChange",state, prev);
  });
 // props.setGlobalState(state);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
