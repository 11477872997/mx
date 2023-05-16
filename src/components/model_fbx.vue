<template>
    <div class="modelFbx">
        <img :src="getImgSrc(`fbximg/${item.fileName}`)" alt="" draggable="true" @dragover="dragover($event)"
            @dragstart="dragstart($event)" @dragend="dragend($event, item)" v-for="(item, index) of list" :key="index"
            class="img_fbx" :title="item.fileName" />
    </div>
</template>

<script setup>
import {fbxloader} from '@/utils/three'
import { getfile, getImgSrc } from '@/utils'
import {setFbx} from '@/store/fbx'
const  store = setFbx();
let list = ref(getfile());
let ev = ref(null);
// 开始拖动
const dragstart = (event) => {
    event.toElement.style.border = '2px solid #7f5711';
}
// 当被拖动的对象在另一对象容器范围内拖动时触发
const dragover = (event) => {
    ev.value = event;
}
// 拖动结束
const dragend = (event, object) => {
    let name = object.fileName.split('.');
    event.toElement.style.border = '2px solid #fff';
    const dropZone = document.getElementById('drop-zone');
    const isOnDropZone = event.pageX >= dropZone.offsetLeft &&
        event.pageX <= dropZone.offsetLeft + dropZone.offsetWidth &&
        event.pageY >= dropZone.offsetTop &&
        event.pageY <= dropZone.offsetTop + dropZone.offsetHeight;
    // 超过当前容器触发
    nextTick(() => {
        if(ev.value){
            if (ev.value.x !== event.x && ev.value.y !== event.y) {
                if (isOnDropZone) {
                    // 拖拽到了指定位置，执行相应的操作
                    fbxloader(`model/${name[0]}.fbx`).then(fbx => {
                         window.parameter.dragMeshList.add(fbx);
                           Object.keys(fbx.children).map(item =>{
                                fbx.children[item].label = fbx.children[item].name;
                           })
                            //  调整模型位置和大小
                            fbx.scale.setScalar(0.2);
                            fbx.name = name[0];
                            fbx.label = name[0];
                            store.setcomName('fbxmen');
                            store.setdragObjects(fbx);
                            console.log( '模型加载完成',fbx.id)
                            // 拖完禁止再次拖拽
                            event.toElement.draggable = false;
                            event.toElement.style.border = '2px solid red';
                            ElMessage({
                                message: `【${name[0]}】模型加载完成`,
                                type: 'success',
                            })
                        })    
    
                }
            }
        }
      
    })
}
</script>

<style lang="scss" scoped>
.modelFbx {
    position: absolute;
    max-height: 600px;
    border-radius: 5px;
    left: 20px;
    top: 10%;
    background: rgb(100, 100, 100);
    padding: 5px;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    overflow: auto;
    z-index: 99;

    .img_fbx {
        width: 50px;
        height: 50px;
        margin: 5px 0px;
        border-radius: 5px;
        border: 2px solid #fff;
        cursor: pointer;
    }

}
</style>