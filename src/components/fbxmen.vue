<template>
    <div class="fbxmen">
        <!-- 元素 -->
        <div class="elementname">
            <el-tree
                :data="store.$state.dragObjects"
                ref="tree"
                highlight-current
                @node-click="handleNodeClick"
                accordion
                ></el-tree>
        </div>
        <!-- 坐标系 -->
        <template v-if="store.$state.objectList">
            <!-- {{ projects.position }} -->
                <el-form ref="ruleFormRef" class="menruleForm" :model="store.$state.objectList" label-position="left" :rules="rules"
                label-width="120px" status-icon>
                <el-divider content-position="left">坐标</el-divider>
                <section>
                    <el-form-item label="坐标X">
                        <el-input-number show-input    v-model="store.$state.objectList.position.x"   />
                    </el-form-item>
                    <el-form-item label="坐标Y">
                        <el-input-number show-input  v-model="store.$state.objectList.position.y" />
                    </el-form-item>
                    <el-form-item label="坐标Z">
                        <el-input-number show-input  v-model="store.$state.objectList.position.z" />
                    </el-form-item>
                </section>
                <el-divider content-position="left">缩放</el-divider>
                <section>
                    <el-form-item label="缩放X">
                        <el-input-number show-input   :step="0.1" v-model="store.$state.objectList.scale.x" />
                    </el-form-item>
                    <el-form-item label="缩放Y">
                        <el-input-number show-input  :step="0.1" v-model="store.$state.objectList.scale.y" />
                    </el-form-item>
                    <el-form-item label="缩放Z">
                        <el-input-number show-input   :step="0.1" v-model="store.$state.objectList.scale.z" />
                    </el-form-item>
                </section>
                <el-divider content-position="left">旋转</el-divider>
                <section>
                    <el-form-item label="旋转X">
                        <el-input-number show-input  v-model="store.$state.objectList.rotation.x" />
                    </el-form-item>
                    <el-form-item label="旋转Y">
                        <el-input-number show-input  v-model="store.$state.objectList.rotation.y" />
                    </el-form-item>
                    <el-form-item label="旋转Z">
                        <el-input-number show-input  v-model="store.$state.objectList.rotation.z" />
                    </el-form-item>
                </section>
            </el-form> 
        </template>
    </div>
</template>

<script setup>
import {setFbx} from '@/store/fbx'
const  store = setFbx();
const rules = reactive({
})
// const projects  =  storeToRefs(store.$state.objectList);
// 点击当前模块
const  handleNodeClick =(data, node, component) =>{
    store.selectObject(data);
 }

</script>

<style lang="scss" scoped>
.fbxmen {
    position: relative;
    padding: 10px;
    display: flex;
    padding-bottom: 30px;
    .elementname {
        width: 200px;
        border-right: 1px solid #ccc;
        padding-right: 20px;
        margin-right: 20px;
    }

    .menruleForm {
        width: 100%;
    }
}
::v-deep(.el-input-number){
    width: 100%;
}
</style>