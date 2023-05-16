<template>
    <div class="fbx">
        <ModelFbx></ModelFbx>

        <ModelMen   ref="refmodelMen"></ModelMen>
        <!-- 菜单 -->
        <VueDragResizeRotate 
        :parent="true"
         :x="fbxwidth/3" :y="fbxheight-100"
          w="auto" h="auto" 
          :z="999"
          class-name-dragging="classNameDragging"
         :drag-cancel="'.drag-cancel'"
          >
          <div class="fbx_btn"> 
            <el-button type="primary"  class="drag-cancel" @click.stop.prevent="onismenDrawer">菜单</el-button>
            <el-button type="primary" class="drag-cancel" @click.stop.preven="exportjpg">导出</el-button>
            <el-button type="primary" class="drag-cancel"  @click.stop.preven="$router.go(0)" >重置</el-button>
            <el-button type="primary"  class="drag-cancel" @click.stop.prevent="dragOpen('translate')">平移</el-button>
            <el-button type="primary"  class="drag-cancel" @click.stop.prevent="dragOpen('scale')">缩放</el-button>
            <el-button type="primary"  class="drag-cancel" @click.stop.prevent="dragOpen('rotate')">旋转</el-button>
            <el-button type="primary"  class="drag-cancel" @click.stop.prevent="dragClose()">关闭事件</el-button>
        </div>
      </VueDragResizeRotate>
      <!-- 3d容器 -->
        <div id="drop-zone" class="drop-zone" ref="container"></div>
    </div>
</template>
  
<script setup>
import {setFbx} from '@/store/fbx'
// 模型容器
import  ModelFbx from '@/components/model_fbx.vue'
// 右边菜单组成
import  ModelMen from '@/components/model_men.vue'
// 自定义工具类
import {initScene,initCamera,initRenderer,onexport,setsTheBackgroundColor,
    initLight,initAmbientLight,inOrbitControls,inTransformControls,inDragMeshList,dragClose
} from '@/utils/three'
const refmodelMen = ref(null);
const  store = setFbx();
const container = ref(null);
const fbxwidth = ref(window.innerWidth-10);
const fbxheight = ref(window.innerHeight-10);
async function init(){
   // 创建场景
    window.parameter.scene = await initScene();
     // 创建相机
     let ojblist = { fov: 75, near: 0.1, far: 10000, positionX: 0, positionY: 400, positionZ: 600 };
     window.parameter.camera =  await initCamera(ojblist);
    // 渲染器
    window.parameter.renderer = await initRenderer(container.value);
    // 设置默认背景颜色
    setsTheBackgroundColor( 'rgba(240,226,189,1)');
    
    // 设置默认聚光灯颜色
    window.parameter.light =  await initLight(0xffffff);
    // 设置默认聚光灯颜色
    window.parameter.ambientLight =  await initAmbientLight(0xffffff);
    // 设置鼠标控制器
    const OrbitControlsJSON = {
        minDistance: 0,// 移动相机最近位置
        maxDistance: 1200, // 移动相机最远位置
        minPolarAngle: 0, // 最小仰视角
        maxPolarAngle: Math.PI / 2, // 最大俯视角
        enableDamping: true, // 启用阻尼
        autoRotate: false, // 自动旋转
        autoRotateSpeed: 0,// 自动旋转速度
        zoomSpeed: 1,
        enablePan: true,
        screenSpacePanning: false,
  }
  window.parameter.controls = await inOrbitControls();
  window.parameter.controls = Object.assign( window.parameter.controls,OrbitControlsJSON);
  //   一个模型会被用于拖拽的组
  window.parameter.dragMeshList = await inDragMeshList();
//   拖拽控件
  window.parameter.transformControls = await inTransformControls();
    animate();
}
// 渲染场景
function animate() {
    requestAnimationFrame(animate);
    window.parameter.renderer.render( window.parameter.scene, window.parameter.camera);
    window.parameter.controls.update();
};

// 监听窗口大小变化事件
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
   fbxwidth.value =  window.innerWidth -10;
   fbxheight.value =  window.innerHeight-10;
   window.parameter.camera.aspect = window.innerWidth / window.innerHeight;
   window.parameter.camera.updateProjectionMatrix();
   window.parameter.renderer.setSize(window.innerWidth, window.innerHeight);
}

const   onismenDrawer = ()=>{
    refmodelMen.value.normallyOpen();
    store.setcomName('men');
}
// 导出
const exportjpg = () => {
    onexport(parameter);
}
// 公共菜单事件
const dragOpen=(value)=>{
    store.setModelName(value);
}
onMounted(() => {
    init();
})






</script>
<style lang="scss" scoped>
.fbx{
  position: relative;
    width: v-bind('fbxwidth+"px"');
    height: v-bind('fbxheight+"px"');
}
.drop-zone{
    position: relative;
    width: 100%;
    height: 100%;
}
.fbx_btn{
   padding: 8px;
}
.classNameDragging{
  background: #646464;
}
::v-deep(.el-button+.el-button) {
    margin-left: 0px; 
}
::v-deep(.el-button) {
    margin: 5px !important;
}
</style>