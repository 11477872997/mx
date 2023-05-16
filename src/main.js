import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from '@/router'
//自动指令事件
import directiveIncident from '@/utils/directiveIncident.js';
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// pinia
import pinia from '@/store'

import  '@/utils/fbxData'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia);
app.use(router)
app.use(directiveIncident)
app.use(VueDragResizeRotate)
  .mount('#app')
export default app