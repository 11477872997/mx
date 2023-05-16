<template>
    <div class="men">
        <el-form ref="ruleFormRef" class="menruleForm" :model="ruleForm" label-position="left" :rules="rules"
            label-width="120px"  status-icon>
            <el-divider content-position="left">菜单</el-divider>
            <section>
                <el-form-item label="背景颜色">
                 <el-color-picker v-model="ruleForm.bgcolor" show-alpha @change="onsetbg" />
              </el-form-item>
            </section>
            <el-divider content-position="left">网格</el-divider>
            <section>
                <el-form-item label="是否启动网格">
                    <el-switch v-model="ruleForm.valuegrid" @change="onsetvaluegrid" />
                </el-form-item>
                <el-form-item label="网格宽度">
                    <el-input-number v-model="ruleForm.wdith" :min="1" :disabled="ruleForm.gridDisabled"
                        @change="onsetwdith" />
                </el-form-item>
                <el-form-item label="网格数量">
                    <el-input-number v-model="ruleForm.quantity" :min="1" :disabled="ruleForm.gridDisabled"
                        @change="onsetwdith" />
                </el-form-item>
                <el-form-item label="网格中心线颜色">
                    <el-color-picker v-model="ruleForm.centrecolor" show-alpha :disabled="ruleForm.gridDisabled"
                        @change="onsetwdith" />
                </el-form-item>
                <el-form-item label="网格颜色">
                    <el-color-picker v-model="ruleForm.gridbg" show-alpha :disabled="ruleForm.gridDisabled"
                        @change="onsetwdith" />
                </el-form-item>
            </section>
            <el-divider content-position="left">聚光灯</el-divider>
            <section>
                <el-form-item label="是否启动聚光灯">
                    <el-switch v-model="ruleForm.light" @change="onsetlight" />
                </el-form-item>
                <el-form-item label="聚光灯颜色">
                    <el-color-picker v-model="ruleForm.lightColor"   :disabled="ruleForm.lightDisabled" show-alpha
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="聚光灯X坐标">
                    <el-input-number v-model="ruleForm.lightLightX" :min="0" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="聚光灯Y坐标">
                    <el-input-number v-model="ruleForm.lightLightY" :min="0" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="聚光灯Z坐标">
                    <el-input-number v-model="ruleForm.lightLightZ" :min="0" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="聚光灯角度">
                    <el-input-number v-model="ruleForm.lightangle" :min="0" :step="0.1" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover"
                        content="angle属性是用来设置从聚光灯的位置开始可以辐射的范围，单位是弧度，应该不超过 Math.PI/2。默认值为 Math.PI/3">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item label="聚光灯强度">
                    <el-input-number v-model="ruleForm.lightintensity" :min="0" :step="0.1" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover"
                        content="intensity属性是用来设置聚光灯的强度，默认值是1，如果设置成0那什么也看不到，该值越大，点光源看起来越亮">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item label="聚光灯距离">
                    <el-input-number v-model="ruleForm.lightdistance" :min="0" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover" content="聚光灯照射距离。默认值为0（无限远）">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item label="聚光灯强度">
                    <el-input-number v-model="ruleForm.lightdecay" :min="0" :step="0.1" :disabled="ruleForm.lightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover"
                        content="聚光灯强度随距离增加而衰减的速率。默认值为1">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item label="聚光灯照射面">
                    <el-input-number v-model="ruleForm.lightpenumbra" :min="0" :max="1" :step="0.1"
                        :disabled="ruleForm.lightDisabled" @change="setingtht($event, 'lightPosition')" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover"
                        content="penumbra属性表示照射面光影衰减百分比，取值在0和1之间， 默认值为 0.0">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
            </section>
            <el-divider content-position="left">环境光</el-divider>
            <section>
                <el-form-item label="是否启动环境光">
                    <el-switch v-model="ruleForm.ambientLight" @change="onsetambientLight" />
                </el-form-item>
                <el-form-item label="环境光颜色">
                    <el-color-picker v-model="ruleForm.ambientLightColor"  :disabled="ruleForm.ambientLightDisabled" show-alpha
                        @change="setambientLight" />
                </el-form-item>
                <el-form-item label="环境光X坐标">
                    <el-input-number v-model="ruleForm.ambientLightX" :min="0" :disabled="ruleForm.ambientLightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="环境光Y坐标">
                    <el-input-number v-model="ruleForm.ambientLightY" :min="0" :disabled="ruleForm.ambientLightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="环境光Z坐标">
                    <el-input-number v-model="ruleForm.ambientLightZ" :min="0" :disabled="ruleForm.ambientLightDisabled"
                        @change="setingtht" />
                </el-form-item>
                <el-form-item label="环境光距离">
                    <el-input-number v-model="ruleForm.ambientLightdistance" :min="0" :disabled="ruleForm.ambientLightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover" content="光源照射的距离。默认值为 0，意味着光的强度不会随着距离的增加而减少。">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item label="环境光强度">
                    <el-input-number v-model="ruleForm.ambientLightintensity" :min="1" :disabled="ruleForm.ambientLightDisabled"
                        @change="setingtht" />
                    <el-popover placement="top-start" title="注解" :width="200" trigger="hover" content="光源照射的强度。默认值为 1。">
                        <template #reference>
                            <el-icon class="men_icon" :size="18">
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </el-form-item>
            </section>
        </el-form>
    </div>
</template>

<script setup>
import { setsTheBackgroundColor, gridlineDrawing, removegridlineDrawing } from '@/utils/three'
const ruleFormRef = ref(null);
let parameter = window.parameter;
const ruleForm = ref({
    bgcolor: 'rgba(240,226,189,1)',
    valuegrid: true,
    gridDisabled: false,
    centrecolor: 'rgba(205,55,0,1)',
    wdith: 1200,
    quantity: 50,
    gridbg: 'rgba(222,218,218,1)',
    light: true,
    lightColor: 'rgba(0, 0, 0, 1)',
    lightDisabled: false,
    lightLightX: 0,
    lightLightY: 0,
    lightLightZ: 0,
    lightangle: 60,
    lightintensity: 2,
    lightdistance: 0,
    lightdecay: 2,
    lightpenumbra: 0.0,
    ambientLight:true,
    ambientLightDisabled:false,
    ambientLightColor:'rgba(255,255,255,1)',
    ambientLightX:0,
    ambientLightY:0,
    ambientLightZ:0,
    ambientLightdistance:0,
    ambientLightintensity:1,
})

const rules = reactive({
})
// 背景颜色
const onsetbg = (value) => {
    if (value == null) {
        ruleForm.value.bgcolor = 'rgba(240,226,189,1)';
    } else {
        // 设置背景颜色
        setsTheBackgroundColor(ruleForm.value.bgcolor);
    }
}
// 网格
const onsetvaluegrid = (value) => {
    if (value) {
        gridlineDrawing(ruleForm.value);
        ruleForm.value.gridDisabled = false;
    } else {
        removegridlineDrawing();
        ruleForm.value.gridDisabled = true;
    }
}

// 网格
const onsetwdith = (value) => {
    gridlineDrawing(ruleForm.value);
}
// 聚光灯
const onsetlight = (value) => {
    if (value) {
        parameter.light.visible = true;
        ruleForm.value.lightDisabled = false;
    } else {
        parameter.light.visible = false;
        ruleForm.value.lightDisabled = true;
    }
}
// 设置聚光灯
const setingtht = (value) => {
    if (value == null) {
        ruleForm.value.lightColor = 'rgba(0, 0, 0, 1)';
        return;
    }
    parameter.light.color.set(ruleForm.value.lightColor);
    parameter.light.distance = ruleForm.value.lightdistance;
    parameter.light.angle = ruleForm.value.lightangle;
    parameter.light.intensity = ruleForm.value.lightintensity;
    parameter.light.decay = ruleForm.value.lightdecay;
    parameter.light.penumbra = ruleForm.value.lightpenumbra;
    parameter.light.position.set(ruleForm.value.ambientLightX, ruleForm.value.ambientLightY, ruleForm.value.ambientLightZ);
}

// 环境光
const onsetambientLight = (value)=>{
    if (value) {
        parameter.ambientLight.visible = true;
        ruleForm.value.ambientLightDisabled = false;
    } else {
        parameter.ambientLight.visible = false;
        ruleForm.value.ambientLightDisabled = true;
    }
}
// 设置环境光
const setambientLight = (value)=>{
    if (value == null) {
        ruleForm.value.ambientLightColor = 'rgba(255, 255,255, 1)';
        return;
    }
    parameter.ambientLight.intensity = ruleForm.value.ambientLightintensity;
    parameter.ambientLight.distance = ruleForm.value.ambientLightdistance;
    parameter.ambientLight.color.set(ruleForm.value.ambientLightColor);
    parameter.ambientLight.position.set(ruleForm.value.lightLightX, ruleForm.value.lightLightY, ruleForm.value.lightLightZ);
}
onMounted(() => {
    nextTick(() => {
        if (ruleForm.value.valuegrid) {
            onsetvaluegrid(true);
        }
    })
})

</script>

<style lang="scss" scoped>
.men {
    position: relative;
    display: flex;
    padding: 10px;
    justify-content: center;

    .menruleForm {
        width: 100%;
    }

    .men_icon {
        margin-left: 20px;
        cursor: pointer;
    }
}
</style>