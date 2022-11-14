import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import {registerMicroApps, start} from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: 'http://localhost:8082',
    container: '#micro-service',
    activeRule: '/yourActiveRule',
  },

]);

// start();
// 延迟启用微应用能力，避免容器div 尚未加载的情况
const startMicroApps = function () {
  setTimeout(() => {
    if (document.getElementById('micro-service')) {
      // 尝试过放在app-main 组件内，但会导致白屏
      start()
    } else {
      startMicroApps()
    }
  }, 500)
}


function render() {
  return new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}

render().$nextTick(startMicroApps)
export default render
