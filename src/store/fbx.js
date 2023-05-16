import { defineStore } from 'pinia'

import {dragOpen} from '@/utils/three'

export const setFbx = defineStore('viewFbx', {
    state: () => {
        return {
            modelName:null, //事件类型
            comName:'men',//动态组件名称
            dragObjects:[], //模型集合
            objectList:null,//坐标参数
        };
    },
    getters: {},
    actions: {
     setModelName(value){
        this.modelName = value;
        dragOpen(value);
     },
     setcomName(value){
        this.comName = value;
     },
     setdragObjects(value){
        this.dragObjects.push(value);
     },
     selectObject(value){
        this.objectList = value;
     }
    }
})


