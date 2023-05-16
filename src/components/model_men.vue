<template>
    <div class="content" ref="modelMen">
        <div class="modelMen">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="主菜单" name="men">
                <men></men>
            </el-tab-pane>
            <el-tab-pane label="模型设置" name="fbxmen">
                <fbxmen></fbxmen>
            </el-tab-pane>
        </el-tabs>
        </div>
        <div class="modelMen_icon" ref="modelMenIcon" @click="onShutDown(true)">
            <el-icon size="35" color="#409eff">
                    <template v-if="flag">
                        <Fold />
                    </template>
                    <template v-else>
                        <Expand />
                    </template>
            </el-icon>
        </div>
    </div>
  
</template>

<script setup>
import {setFbx} from '@/store/fbx'
import fbxmen from './fbxmen.vue';
import men from './men.vue';
const  store = setFbx();
const activeName = ref(store.$state.comName);
watch(()=>store.$state.comName,value => activeName.value = value);
// 替换组件
const handleClick  = (tab,event)=>{
    store.setcomName(tab.paneName);
}
const modelMen = ref(null);
const modelMenIcon = ref(null);
const flag = ref(false);
const onShutDown =(zt)=>{
    if(flag.value){
        modelMen.value.style.right = 0
        modelMenIcon.value.style.left = '-34px'
        flag.value = !zt;
    }else{
        modelMen.value.style.right  = `-${modelMen.value.clientWidth}px`
        modelMenIcon.value.style.left =`-33px`
        flag.value = zt;
    }
}
// 常开
const normallyOpen =()=>{
        modelMen.value.style.right = 0
        modelMenIcon.value.style.left = '-34px'
        flag.value = false;
}
defineExpose({
    normallyOpen
})
</script>

<style lang="scss" scoped>
.content{
    position: fixed;
    z-index: 99;
    right: 0;
    top: 0;
    background: #ffffff;
    transition:all 0.5s;
}
.modelMen{
    position: relative;
    box-shadow: 2px 2px 10px #D9D9D9;
    height:100vh;
    max-height: 100vh;
    overflow: auto;
    z-index: 99;
    right: 0;
    top: 0;
    background: #ffffff;
    transition:all 0.5s;
    box-shadow: 2px 2px 10px #D9D9D9;
    padding: 20px;
}
.modelMen_icon{
    position: absolute;
    top: 0;
    left: -34px;
    width: 35px;
    height: 35px;
    z-index: 99;
    cursor: pointer;
}
.content_btn{
    display: flex;
    justify-content: center;
}
</style>